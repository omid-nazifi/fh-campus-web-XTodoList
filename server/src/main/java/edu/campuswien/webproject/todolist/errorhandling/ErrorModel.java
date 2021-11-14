package edu.campuswien.webproject.todolist.errorhandling;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This class describe the error object model, which is a simple POJO that contains the rejected filedName and a messageError.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorModel{
    private String fieldName;
    private String messageError;
}
