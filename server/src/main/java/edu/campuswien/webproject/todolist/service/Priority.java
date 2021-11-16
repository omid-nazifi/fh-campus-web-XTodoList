package edu.campuswien.webproject.todolist.service;

public enum Priority {
    High(1, "High"),
    Normal(2, "Medium"),
    Low(3, "Low"),
    Unknown(0, "Unknown");

    private int id;
    private String name;

    private Priority(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public static Priority getById(int id) {
        for(Priority e : values()) {
            if(e.id == id) return e;
        }
        return Priority.Unknown;
    }
}
