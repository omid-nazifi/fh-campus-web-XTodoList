package edu.campuswien.webproject.todolist.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ValidationError implements SubErrorModel {
    private String field;
    private String message;

}
