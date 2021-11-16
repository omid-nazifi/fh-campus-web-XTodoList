package edu.campuswien.webproject.todolist.service;

public enum Status {
    TODO(1, "To do"),
    IN_PROGRESS(2, "In Progress"),
    SUSPENDED(3, "Suspended"),
    DONE(4, "Done");

    private int id;
    private String name;

    private Status(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public static Status getById(int id) {
        for(Status e : values()) {
            if(e.id == id) return e;
        }
        throw new IllegalArgumentException("The id does not exist in the Status");
    }
}
