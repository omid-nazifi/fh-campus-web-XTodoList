package edu.campuswien.webproject.todolist.dto;

import edu.campuswien.webproject.todolist.service.Priority;
import edu.campuswien.webproject.todolist.service.Status;
import edu.campuswien.webproject.todolist.validation.OnCreate;
import edu.campuswien.webproject.todolist.validation.OnUpdate;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.time.LocalDateTime;

@Data
public class TaskDto {

    @Null(groups = OnCreate.class)
    @NotNull(groups = OnUpdate.class, message = "id is required!")
    private Long id;

    private Long parentId;

    @NotNull(message = "User is required!")
    private Long userId;

    @NotNull(message = "Title is required!")
    private String title;

    private String description;

    @NotNull(message = "Status is required!")
    private Status status;

    private LocalDateTime creationDate;
    private LocalDateTime deadline;
    private Priority priority;
    private String color;
    private String tags;
}
