package edu.campuswien.webproject.todolist.service;

public enum Status {
    Todo(1, "To do"),
    InProgress(2, "In Progress"),
    Suspended(3, "Suspended"),
    Done(4, "Done");

    private int id;
    private String name;

    private Status(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
