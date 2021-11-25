package edu.campuswien.webproject.todolist.controller;

import edu.campuswien.webproject.todolist.config.WebSecurityConfig;
import edu.campuswien.webproject.todolist.dto.LoginDto;
import edu.campuswien.webproject.todolist.dto.NewPasswordDto;
import edu.campuswien.webproject.todolist.dto.UserDto;
import edu.campuswien.webproject.todolist.exception.*;
import edu.campuswien.webproject.todolist.model.User;
import edu.campuswien.webproject.todolist.service.UserService;
import edu.campuswien.webproject.todolist.validation.OnCreate;
import edu.campuswien.webproject.todolist.validation.OnUpdate;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.crypto.spec.SecretKeySpec;
import javax.validation.Valid;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@Validated
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder, ModelMapper modelMapper) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }

    @CrossOrigin(origins="*")
    @PostMapping(value = "/users")
    public UserDto register(@Validated(OnCreate.class) @RequestBody UserDto userDto) throws Exception {
        userDto.setId(null);
        validateUser(userDto, false);

        User user = convertToEntity(userDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User newUser = userService.createUser(user);
        return convertToDto(newUser);
    }

    @CrossOrigin(origins="*")
    @PutMapping(value = "/users")

    public UserDto update(@Validated(OnUpdate.class) @RequestBody UserDto userDto) throws Exception {
        userDto.setPassword(null);
        validateUser(userDto, true);

        User user = convertToEntity(userDto);
        User editedUser = userService.updateUser(user);
        return convertToDto(editedUser);
    }

    @CrossOrigin(origins="*")
    @PostMapping({"/login"})
    public UserDto login(@Valid @RequestBody LoginDto loginData) throws AuthenticationException {
        Optional<User> authUser = userService.authenticate(loginData);
        if(authUser.isEmpty()) {
            throw new AuthenticationExceptionImpl("Username or password are not valid!");
        }

        String token = getJWTToken(authUser.get().getUsername());
        UserDto userDto = convertToDto(authUser.get());
        userDto.setToken(token);
        return userDto;
    }

    @CrossOrigin(origins="*")
    @GetMapping({"/users/logout"})
    public Boolean logout() {
        //SecurityContextHolder.clearContext();
        return true;
    }

    @CrossOrigin(origins="*")
    @GetMapping(value = "/users")
    public List<UserDto> getAllUser() {
        List<User> users = userService.getAllUsers();
        List<UserDto> usersData = new ArrayList<>();
        for (User user : users) {
            usersData.add(convertToDto(user));
        }
        return usersData;
    }

    @CrossOrigin(origins="*")
    @GetMapping(value = "/users/{id}")
    public UserDto getUser(@PathVariable long id) throws Exception {
        Optional<User> optUser = userService.getUserById(id);
        if(optUser.isPresent()) {
            return convertToDto(optUser.get());
        }
        throw new NotFoundDataException(new ErrorModel(HttpStatus.NOT_FOUND, "There isn't a user with this Id!"),
                "Not found error in UserController.getUser()!");
    }

    @CrossOrigin(origins="*")
    @PutMapping(value = "/users/changePassword")
    public Boolean changePassword(@Valid @RequestBody NewPasswordDto passwordDto) throws Exception {
        Optional<User> user = userService.getUserById(passwordDto.getUserId());
        validatePassword(passwordDto, user);

        return userService.changePassword(user.get(), passwordDto.getNewPassword());
    }

    private UserDto convertToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    private User convertToEntity(UserDto userDto) {
        if (userDto.getId() != null && userDto.getId() != 0) {
            Optional<User> oldUser = userService.getUserById(userDto.getId());
            if(oldUser.isPresent()) {
                User user = oldUser.get();
                //Id, Password and username could not be changed
                user.setName(userDto.getName());
                return user;
            }
        }
        return modelMapper.map(userDto, User.class);
    }

    private void validateUser(UserDto userDto, boolean isUpdate) throws InputValidationException {
        List<SubErrorModel> errors = new ArrayList<>();
        if(isUpdate && userService.getUserById(userDto.getId()).isEmpty()) {
            errors.add(new ValidationError("Id", "Id is not valid!"));
        }

        if(!isUpdate && userService.isUserAvailable(userDto.getUsername())) {
            errors.add(new ValidationError("username", "There is an account with that email address:" + userDto.getUsername()));
        }

        if(isUpdate && !userService.isUserAvailable(userDto.getUsername())) {
            errors.add(new ValidationError("username", "This email address doesn't exist!"));
        }

        if(!errors.isEmpty()) {
            ErrorModel errorModel = new ErrorModel(HttpStatus.BAD_REQUEST, "Validation errors");
            errorModel.setSubErrors(errors);
            throw new InputValidationException(errorModel, "Validation error in the UserController.validateUser()!");
        }
    }

    private void validatePassword(NewPasswordDto passwordDto, Optional<User> user) throws InputValidationException {
        List<SubErrorModel> errors = new ArrayList<>();
        if(user.isEmpty()) {
            errors.add(new ValidationError("UserId", "User does not exist!"));
        }
        if(!passwordDto.getNewPassword().equals(passwordDto.getRepeatedNewPassword())) {
            errors.add(new ValidationError("NewPassword", "The new password does not matched with repeated one!"));
        }
        if(user.isPresent() && !userService.checkIfValidOldPassword(user.get(), passwordDto.getOldPassword())) {
            errors.add(new ValidationError("oldPassword", "Old password is incorrect!"));
        }

        if(!errors.isEmpty()) {
            ErrorModel errorModel = new ErrorModel(HttpStatus.BAD_REQUEST, "Change Password Errors");
            errorModel.setSubErrors(errors);
            throw new InputValidationException(errorModel, "Validation error in the UserController.validatePassword()!");
        }
    }

    private String getJWTToken(String username) {
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_USER");

        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(WebSecurityConfig.JWT_SECRET_KEY);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        String token = Jwts
                .builder()
                .setId(UUID.randomUUID().toString())
                .setSubject(username)
                .claim(WebSecurityConfig.JWT_CLAIM,grantedAuthorities.stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + WebSecurityConfig.JWT_TOKEN_EXPIRATION))
                .signWith(signatureAlgorithm, signingKey).compact();

        return WebSecurityConfig.JWT_TOKEN_PREFIX + token;
    }

}
