package edu.campuswien.webproject.todolist.controller;

import edu.campuswien.webproject.todolist.dto.LoginDto;
import edu.campuswien.webproject.todolist.dto.NewPasswordDto;
import edu.campuswien.webproject.todolist.dto.UserDto;
import edu.campuswien.webproject.todolist.model.User;
import edu.campuswien.webproject.todolist.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
    public UserDto register(@Valid @RequestBody UserDto userDto) throws Exception {
        if(userService.isUserAvailable(userDto.getUsername())) {
            //TODO Error
            throw new Exception("There is an account with that email address:" + userDto.getUsername());
        }
        User user = convertToEntity(userDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User newUser = userService.createUser(user);
        return convertToDto(newUser);
    }

    @CrossOrigin(origins="*")
    @PutMapping(value = "/update")
    public UserDto update(@Valid @RequestBody UserDto userDto) throws Exception {
        if(!userService.isUserAvailable(userDto.getUsername())) {
            //TODO Error is not exist
            throw new Exception("There is not any account with this email address:" + userDto.getUsername());
        }
        User user = convertToEntity(userDto);
        User editedUser = userService.updateUser(user);
        return convertToDto(editedUser);
    }

    @CrossOrigin(origins="*")
    @PostMapping({"/login"})
    public UserDto login(@Valid @RequestBody LoginDto loginData) {
        if(loginData.getUsername() == null && loginData.getPassword() == null) {
            //TODO Error
            return null;
        }
        Optional<User> authUser = userService.authenticate(loginData);
        if(authUser.isPresent()) {
            UserDto userDto = convertToDto(authUser.get());
            return userDto;
        }
        return null;
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
    public Boolean changePassword(@Valid @RequestBody NewPasswordDto passwordDto) {
        Optional<User> user = userService.getUserById(passwordDto.getUserId());
        if(!user.isPresent()) {
            //TODO Error
        }
        if(!passwordDto.getNewPassword().equals(passwordDto.getRepeatedNewPassword())) {
            //TODO Error
        }
        if(!userService.checkIfValidOldPassword(user.get(), passwordDto.getOldPassword())) {
            //TODO Error
        }

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

}
