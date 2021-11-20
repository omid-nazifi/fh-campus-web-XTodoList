package edu.campuswien.webproject.todolist.controller;

import edu.campuswien.webproject.todolist.dto.CommentDto;
import edu.campuswien.webproject.todolist.exception.*;
import edu.campuswien.webproject.todolist.model.Comment;
import edu.campuswien.webproject.todolist.service.CommentService;
import edu.campuswien.webproject.todolist.service.TaskService;
import edu.campuswien.webproject.todolist.validation.OnCreate;
import edu.campuswien.webproject.todolist.validation.OnUpdate;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@Validated
public class CommentController {

    private final CommentService commentService;
    private final TaskService taskService;
    private final ModelMapper modelMapper;

    @Autowired
    public CommentController(CommentService commentService, TaskService taskService, ModelMapper modelMapper) {
        this.commentService = commentService;
        this.taskService = taskService;
        this.modelMapper = modelMapper;
    }

    @CrossOrigin(origins="*")
    @PostMapping(path = "/comments")
    public CommentDto addComment(@Validated(OnCreate.class) @RequestBody CommentDto commentDto) throws Exception {
        validateComment(commentDto, false);

        Comment comment = convertToEntity(commentDto);
        comment = commentService.create(comment);
        return convertToDto(comment);
    }

    @CrossOrigin(origins="*")
    @PutMapping(path = "/comments")
    public CommentDto editComment(@Validated(OnUpdate.class) @RequestBody CommentDto commentDto) throws Exception {
        validateComment(commentDto, true);

        Comment comment = convertToEntity(commentDto);
        comment = commentService.update(comment);
        return convertToDto(comment);
    }

    @CrossOrigin(origins="*")
    @DeleteMapping(path = "/comments/{id}")
    public Boolean deleteComment(@PathVariable long id) throws Exception {
        Optional<Comment> comment = commentService.getCommentById(id);
        if(comment.isEmpty()) {
            throw new NotFoundDataException(new ErrorModel(HttpStatus.NOT_FOUND, "There is not a comment with this Id!"),
                    "Not found error in CommentController.delete()!");
        }
        return commentService.delete(comment.get());
    }

    @CrossOrigin(origins="*")
    @GetMapping(path = "/comments/task/{taskId}")
    public List<CommentDto> getCommentsOfTask(@PathVariable long taskId) {
        List<Comment> comments = commentService.getCommentsByTaskId(taskId);
        List<CommentDto> commentsData = new ArrayList<>();
        for (Comment comment : comments) {
            commentsData.add(convertToDto(comment));
        }
        return commentsData;
    }

    private CommentDto convertToDto(Comment comment) {
        return modelMapper.map(comment, CommentDto.class);
    }

    private Comment convertToEntity(CommentDto commentDto) {
        Comment mappedComment = modelMapper.map(commentDto, Comment.class);
        if (commentDto.getId() != null && commentDto.getId() != 0) { //in the Update
            Optional<Comment> optComment = commentService.getCommentById(commentDto.getId());
            if(optComment.isPresent()) {
                Comment oldComment = optComment.get();
                mappedComment.setCreationTime(oldComment.getCreationTime());
            }
        }
        if(mappedComment.getCreationTime() == null) {
            mappedComment.setCreationTime(LocalDateTime.now());
        }
        if(mappedComment.getModifiedTime() == null) {
            mappedComment.setModifiedTime(LocalDateTime.now());
        }
        return mappedComment;
    }

    private void validateComment(CommentDto commentDto, boolean isUpdate) throws InputValidationException {
        List<SubErrorModel> errors = new ArrayList<>();
        if(isUpdate && commentService.getCommentById(commentDto.getId()).isEmpty()) {
            errors.add(new ValidationError("Id", "This comment does not exist!"));
        }
        if(commentDto.getTaskId() != null && taskService.getTaskById(commentDto.getTaskId()).isEmpty()) {
            errors.add(new ValidationError("TaskId", "Task does not exist!"));
        }

        if(!errors.isEmpty()) {
            ErrorModel errorModel = new ErrorModel(HttpStatus.BAD_REQUEST, "Validation errors");
            errorModel.setSubErrors(errors);
            throw new InputValidationException(errorModel, "Validation error in the CommentController.validateComment()!");
        }
    }
}
