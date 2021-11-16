package edu.campuswien.webproject.todolist.model;

import edu.campuswien.webproject.todolist.service.Priority;
import edu.campuswien.webproject.todolist.service.Status;
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
    private Long userId;

    @Column(nullable = false)
    private String title;

    @Column
    private String description;

    @Enumerated
    @Column(nullable = false, columnDefinition = "smallint")
    private Status status;

    private LocalDateTime creationDate;

    @Column
    private LocalDateTime deadline;

    @Enumerated
    @Column(nullable = false, columnDefinition = "smallint")
    private Priority priority;

    @Column
    private String color;

    @Column
    private String tags;
}
