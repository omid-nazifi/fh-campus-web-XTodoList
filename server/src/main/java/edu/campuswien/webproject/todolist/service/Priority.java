package edu.campuswien.webproject.todolist.service;

public enum Priority {
    HIGH(1, "High"),
    NORMAL(2, "Medium"),
    LOW(3, "Low");

    private int id;
    private String name;

    private Priority(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public static Priority getById(int id) throws IllegalArgumentException {
        for(Priority e : values()) {
            if(e.id == id)
                return e;
        }
        throw new IllegalArgumentException("The id does not exist in the Priority");
    }
}
