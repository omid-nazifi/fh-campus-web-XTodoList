package edu.campuswien.webproject.todolist.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long id;

    @Column(nullable = true)
    private Long parentId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = true)
    private String description;

    @Column(nullable = false)
    private int status;

    @Column(nullable = true)
    private LocalDateTime creationDate;

    @Column(nullable = true)
    private LocalDateTime deadline;

    @Column(nullable = false)
    private int priority;

    @Column(nullable = true)
    private String color;

    @Column(nullable = true)
    private String tags;
}
