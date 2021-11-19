package edu.campuswien.webproject.todolist.controller;

import edu.campuswien.webproject.todolist.dto.LoginDto;
import edu.campuswien.webproject.todolist.dto.NewPasswordDto;
import edu.campuswien.webproject.todolist.dto.UserDto;
import edu.campuswien.webproject.todolist.exception.ErrorModel;
import edu.campuswien.webproject.todolist.exception.InputValidationException;
import edu.campuswien.webproject.todolist.exception.SubErrorModel;
import edu.campuswien.webproject.todolist.exception.ValidationError;
import edu.campuswien.webproject.todolist.model.User;
import edu.campuswien.webproject.todolist.service.UserService;
import edu.campuswien.webproject.todolist.validation.OnCreate;
import edu.campuswien.webproject.todolist.validation.OnUpdate;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.message.AuthException;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@Validated
@RequestMapping(value = "user")
public class UserController {

    private final UserService userService;
    private PasswordEncoder passwordEncoder;
    private ModelMapper modelMapper;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder, ModelMapper modelMapper) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }

    @CrossOrigin(origins="*")
    @PostMapping(value = "/register")
    public UserDto register(@Validated(OnCreate.class) @RequestBody UserDto userDto) throws Exception {
        userDto.setId(null);
        validateUser(userDto, false);

        User user = convertToEntity(userDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User newUser = userService.createUser(user);
        return convertToDto(newUser);
    }

    @CrossOrigin(origins="*")
    @PutMapping(value = "/update")

    public UserDto update(@Validated(OnUpdate.class) @RequestBody UserDto userDto) throws Exception {
        userDto.setPassword(null);
        validateUser(userDto, true);

        User user = convertToEntity(userDto);
        User editedUser = userService.updateUser(user);
        return convertToDto(editedUser);
    }

    @CrossOrigin(origins="*")
    @PostMapping({"/login"})
    public UserDto login(@Valid @RequestBody LoginDto loginData) throws AuthException {
        Optional<User> authUser = userService.authenticate(loginData);
        if(authUser.isPresent()) {
            UserDto userDto = convertToDto(authUser.get());
            return userDto;
        }

        throw new AuthException("Username or password are not valid!");
    }

    @GetMapping(value = "/all")
    public List<UserDto> list() {
        List<User> users = userService.getAllUsers();
        List<UserDto> usersData = new ArrayList<>();
        for (User user : users) {
            usersData.add(convertToDto(user));
        }
        return usersData;
    }

    @PutMapping(value = "/changePassword")
    public Boolean changePassword(@Valid @RequestBody NewPasswordDto passwordDto) throws Exception {
        Optional<User> user = userService.getUserById(passwordDto.getUserId());
        validatePassword(passwordDto, user);

        return userService.changePassword(user.get(), passwordDto.getNewPassword());
    }

    private UserDto convertToDto(User user) {
        UserDto userDto = modelMapper.map(user, UserDto.class);
        return userDto;
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

    private boolean validateUser(UserDto userDto, boolean isUpdate) throws InputValidationException {
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

        return true;
    }

    private boolean validatePassword(NewPasswordDto passwordDto, Optional<User> user) throws InputValidationException {
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

        return true;
    }

}
