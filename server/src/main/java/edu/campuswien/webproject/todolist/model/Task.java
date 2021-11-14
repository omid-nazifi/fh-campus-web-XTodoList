package edu.campuswien.webproject.todolist.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long id;

    @Column
    private Long parentId;

    @Column(nullable = false)
    private String title;

    @Column
    private String description;

    @Column(nullable = false)
    private int status;

    private LocalDateTime creationDate;

    @Column
    private LocalDateTime deadline;

    @Column(nullable = false)
    private int priority;

    @Column
    private String color;

    @Column
    private String tags;
}
