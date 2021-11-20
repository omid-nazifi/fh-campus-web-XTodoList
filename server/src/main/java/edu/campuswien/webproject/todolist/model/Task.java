package edu.campuswien.webproject.todolist.model;

import edu.campuswien.webproject.todolist.service.Priority;
import edu.campuswien.webproject.todolist.service.Status;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

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

    @Column
    private LocalDateTime creationTime;

    @Column
    private LocalDateTime modifiedTime;

    @Column
    private LocalDateTime deadline;

    @Enumerated
    @Column(nullable = false, columnDefinition = "smallint")
    private Priority priority;

    @Column
    private String color;

    @Column
    private String tags;

    @OneToMany(mappedBy = "taskId", targetEntity = Comment.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    //@JoinColumn(name = "taskId")
    @OrderBy("creationTime")
    private List<Comment> comments;
}
