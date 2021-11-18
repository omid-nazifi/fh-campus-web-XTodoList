package edu.campuswien.webproject.todolist.exception;


public class InputValidationException extends Exception {

    private ErrorModel errorModel;

    public InputValidationException(ErrorModel errorModel, String message) {
        super(message);
        this.errorModel = errorModel;
    }

    public InputValidationException(ErrorModel errorModel, String message, Throwable cause) {
        super(message, cause);
        this.errorModel = errorModel;
    }

    public ErrorModel getErrorModel() {
        return errorModel;
    }

}
