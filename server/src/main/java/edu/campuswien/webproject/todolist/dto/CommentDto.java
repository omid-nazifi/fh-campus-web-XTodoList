package edu.campuswien.webproject.todolist.dto;

import edu.campuswien.webproject.todolist.validation.OnCreate;
import edu.campuswien.webproject.todolist.validation.OnUpdate;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.time.LocalDateTime;

@Data
public class CommentDto {
    @Null(groups = OnCreate.class)
    @NotNull(groups = OnUpdate.class, message = "id is required!")
    private Long id;

    @NotNull(groups = {OnCreate.class, OnUpdate.class})
    private Long taskId;

    @NotNull(groups = {OnCreate.class, OnUpdate.class})
    @NotEmpty(groups = {OnCreate.class, OnUpdate.class})
    private String text;
    private LocalDateTime creationTime;
}
