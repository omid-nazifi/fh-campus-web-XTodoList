package edu.campuswien.webproject.todolist.repository;

import edu.campuswien.webproject.todolist.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long id);

    Optional<User> findByUsername(String username);

    List<User> findByUsernameAndPassword(String username, String password);
}
