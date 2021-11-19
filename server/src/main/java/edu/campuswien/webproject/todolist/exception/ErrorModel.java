package edu.campuswien.webproject.todolist.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import edu.campuswien.webproject.todolist.config.ConfigProperties;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * This class describe the error object model, which is a simple POJO that contains the rejected filedName and a messageError.
 */
@Data
@Component
public class ErrorModel{
    private HttpStatus status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime timestamp;
    private String message;
    private String debugMessage;
    private List<SubErrorModel> subErrors;

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
        //TODO check it later
        /*if(configProperties.isDebugMode()) {
            this.debugMessage = ex.getLocalizedMessage();
        }*/
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
        //TODO check it later
        /*if(configProperties.isDebugMode()) {
            this.debugMessage = ex.getLocalizedMessage();
        }*/
    }
}
