package edu.campuswien.webproject.todolist.dto;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class LoginDto implements Serializable {
    private String username;
    private String password;
}
