package edu.campuswien.webproject.todolist.exception;

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

import javax.security.auth.message.AuthException;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

@ControllerAdvice
class RestExceptionHandler  {

    private ResponseEntity<Object> buildResponseEntity(ErrorModel error) {
        return new ResponseEntity<>(error, error.getStatus());
    }

    @ExceptionHandler(value = ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    ErrorModel onConstraintValidationException(ConstraintViolationException e) {
        ErrorModel error = new ErrorModel(HttpStatus.BAD_REQUEST, "Validation errors", e);
        for (ConstraintViolation violation : e.getConstraintViolations()) {
            error.getSubErrors().add(new ValidationError(violation.getPropertyPath().toString(), violation.getMessage()));
        }
        return error;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    ErrorModel onMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        ErrorModel error = new ErrorModel(HttpStatus.BAD_REQUEST, "Validation errors", e);
        for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {
            error.getSubErrors().add(new ValidationError(fieldError.getField(), fieldError.getDefaultMessage()));
        }
        return error;
    }

    @ExceptionHandler(InputValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    ErrorModel onInputValidationException(InputValidationException e) {
        return e.getErrorModel();
    }

    @ExceptionHandler({ConversionFailedException.class, HttpMessageNotReadableException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ResponseEntity<Object> handleHttpMessageNotReadable(Exception ex) {
        String msg = ex.getMessage();
        if(msg.contains("; nested exception is")) {
            String splitMsg[] = msg.split(";");
            msg = splitMsg[0];
        }
        return buildResponseEntity(new ErrorModel(HttpStatus.BAD_REQUEST, msg, ex));
    }

    @ExceptionHandler({AuthException.class})
    @ResponseStatus(HttpStatus.NETWORK_AUTHENTICATION_REQUIRED)
    @ResponseBody
    public ResponseEntity<Object> handleAuthException(AuthException ex) {
        return buildResponseEntity(new ErrorModel(HttpStatus.NETWORK_AUTHENTICATION_REQUIRED, ex.getLocalizedMessage(), ex));
    }

}
