package edu.campuswien.webproject.todolist.model;

public enum HistoryEnum {
    CREATE_TASK(1, "The task is created"),
    UPDATE_TASK(2, "The task is changed"),
    CHANGE_STATUS_TODO(3, "The task is moved to ToDo"),
    CHANGE_STATUS_IN_PROGRESS(4, "The task is moved to InProgress"),
    CHANGE_STATUS_DONE(5, "The task is moved to Done"),
    CHANGE_STATUS_SUSPENDED(6, "The task is moved to Suspended"),
    ADD_COMMENT(7, "A comment is added"),
    DELETE_COMMENT(8, "A comment is removed"),
    EDIT_COMMENT(9, "A comment is edited");

    private int id;
    private String description;

    HistoryEnum(int id, String description) {
        this.id = id;
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
