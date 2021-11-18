package edu.campuswien.webproject.todolist.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * This class describe the error object model, which is a simple POJO that contains the rejected filedName and a messageError.
 */
@Data
public class ErrorModel{
    private HttpStatus status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime timestamp;
    private String message;
    private String debugMessage;
    private List<SubErrorModel> subErrors;

    @Value("${application.config.debug.mode: false}")
    private boolean debugMode;

    private ErrorModel() {
        timestamp = LocalDateTime.now();
        subErrors = new ArrayList<SubErrorModel>();
    }

    public ErrorModel(HttpStatus status) {
        this();
        this.status = status;
    }

    public ErrorModel(HttpStatus status, Throwable ex) {
        this();
        this.status = status;
        this.message = "Unexpected error";
        if(debugMode) {
            this.debugMessage = ex.getLocalizedMessage();
        }
    }

    public ErrorModel(HttpStatus status, String message) {
        this();
        this.status = status;
        this.message = message;
    }

    public ErrorModel(HttpStatus status, String message, Throwable ex) {
        this();
        this.status = status;
        this.message = message;
        if(debugMode) {
            this.debugMessage = ex.getLocalizedMessage();
        }
    }
}
