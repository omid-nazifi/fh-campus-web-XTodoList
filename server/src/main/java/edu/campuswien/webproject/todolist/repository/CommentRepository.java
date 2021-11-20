package edu.campuswien.webproject.todolist.repository;

import edu.campuswien.webproject.todolist.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Override
    Optional<Comment> findById(Long id);

    List<Comment> findByTaskIdOrderByCreationTimeAsc(Long taskId);
}
