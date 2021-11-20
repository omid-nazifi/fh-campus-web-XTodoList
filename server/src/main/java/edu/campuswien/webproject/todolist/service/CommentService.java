package edu.campuswien.webproject.todolist.service;

import edu.campuswien.webproject.todolist.model.Comment;
import edu.campuswien.webproject.todolist.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    public List<Comment> getCommentsByTaskId(Long taskId) {
        return commentRepository.findByTaskIdOrderByCreationTimeAsc(taskId);
    }

    public Comment create(Comment comment) {
        return commentRepository.save(comment);
    }

    public Comment update(Comment comment) {
        return commentRepository.save(comment); //TODO same as create
    }

    public boolean delete(Comment comment) {
        commentRepository.delete(comment);
        return true;
    }
}
