package edu.campuswien.webproject.todolist.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String username; //email

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String salt;
}
