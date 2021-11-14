package edu.campuswien.webproject.todolist.service;

import edu.campuswien.webproject.todolist.dto.LoginDto;
import edu.campuswien.webproject.todolist.dto.UserDto;
import edu.campuswien.webproject.todolist.model.User;
import edu.campuswien.webproject.todolist.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public boolean isUserAvailable(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.isPresent();
    }

    public Optional<User> getUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user;
    }

    public User createUser(User user) {
        user = userRepository.save(user);
        return user;
    }

    public User updateUser(User user) {
        user = userRepository.save(user);//TODO same as create!?
        return user;
    }

    public Optional<User> getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user;
    }

    public Optional<User> authenticate(LoginDto loginData) {
        if(loginData.getUsername() == null && loginData.getPassword() == null) {
            return Optional.empty();
        }
        Optional<User> dbUser = userRepository.findByUsername(loginData.getUsername());
        if(dbUser.isPresent()) {
            if (passwordEncoder.matches(loginData.getPassword(), dbUser.get().getPassword())) {
                return dbUser;
            }
        }
        return Optional.empty();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean changePassword(final User user, final String password) {
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        return true;
    }

    public boolean checkIfValidOldPassword(final User user, final String oldPassword) {
        return passwordEncoder.matches(oldPassword, user.getPassword());
    }
}
