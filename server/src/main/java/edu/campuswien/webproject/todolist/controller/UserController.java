package edu.campuswien.webproject.todolist.controller;

import edu.campuswien.webproject.todolist.dto.UserDto;
import edu.campuswien.webproject.todolist.model.User;
import edu.campuswien.webproject.todolist.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@Validated
@RequestMapping(value = "user")
public class UserController {

    private final UserService userService;
    private ModelMapper modelMapper;

    @Autowired
    public UserController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @RequestMapping(value = "register", method = RequestMethod.POST)
    public void register(@RequestBody UserDto userDto) {
        if(userService.isUserAvailable(userDto.getUsername())) {
            //Error
        }
        userService.createUser(convertToEntity(userDto));
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<UserDto> list() {
        return new ArrayList<UserDto>();
    }

    private UserDto convertToDto(User user) {
        UserDto userDto = modelMapper.map(user, UserDto.class);
        return userDto;
    }

    private User convertToEntity(UserDto userDto) {
        User user = modelMapper.map(userDto, User.class);

        if (userDto.getId() != null) {
            Optional<User> oldUser = userService.getUserById(userDto.getId());
            //post.setRedditID(oldPost.getRedditID());
        }
        return user;
    }

}
