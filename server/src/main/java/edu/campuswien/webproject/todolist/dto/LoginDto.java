package edu.campuswien.webproject.todolist.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class LoginDto implements Serializable {
    @NotNull
    @NotEmpty
    @Email(message = "Email is not valid!")
    private String username;

    @NotNull
    @NotEmpty
    private String password;
}
