package edu.campuswien.webproject.todolist.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class NewPasswordDto implements Serializable {
    private String oldPassword;
    private String newPassword;
    private String repeatedNewPassword;
}
