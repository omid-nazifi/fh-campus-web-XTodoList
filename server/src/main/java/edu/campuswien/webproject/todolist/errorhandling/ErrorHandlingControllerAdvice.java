package edu.campuswien.webproject.todolist.errorhandling;

import org.springframework.core.convert.ConversionFailedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

@ControllerAdvice
class ErrorHandlingControllerAdvice {

    @ExceptionHandler(value = ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    ValidationErrorResponse onConstraintValidationException(ConstraintViolationException e) {
        ValidationErrorResponse error = new ValidationErrorResponse();
        for (ConstraintViolation violation : e.getConstraintViolations()) {
            error.getErrorMessage().add(new ErrorModel(violation.getPropertyPath().toString(), violation.getMessage()));
        }
        return error;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    ValidationErrorResponse onMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        ValidationErrorResponse error = new ValidationErrorResponse();
        for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {
            error.getErrorMessage().add(new ErrorModel(fieldError.getField(), fieldError.getDefaultMessage()));
        }
        return error;
    }

    @ExceptionHandler({ConversionFailedException.class, HttpMessageNotReadableException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ResponseEntity<String> handleConflict(RuntimeException ex) {
        String msg = ex.getMessage();
        if(msg.contains("; nested exception is")) {
            String splitMsg[] = msg.split(";");
            msg = splitMsg[0];
        }
        return new ResponseEntity<>(msg, HttpStatus.BAD_REQUEST);
    }

}
