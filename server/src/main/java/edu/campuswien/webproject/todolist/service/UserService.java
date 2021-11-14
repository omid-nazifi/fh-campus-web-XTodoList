package edu.campuswien.webproject.todolist.service;

import edu.campuswien.webproject.todolist.model.User;
import edu.campuswien.webproject.todolist.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean isUserAvailable(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.isPresent();
    }

    public User createUser(User user) {
        user = userRepository.save(user);
        return user;
    }

    public Optional<User> getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user;
    }
}
