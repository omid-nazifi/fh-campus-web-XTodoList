package edu.campuswien.webproject.todolist.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long id;

    @Column(nullable = false)
    private Long taskId;

    @Enumerated
    @Column(nullable = false, columnDefinition = "smallint")
    private HistoryEnum historyCode;

    @Column(nullable = false)
    private LocalDateTime creationTime;

    public static History builder(long taskId, HistoryEnum historyCode) {
        History history = new History();
        history.setTaskId(taskId);
        history.setCreationTime(LocalDateTime.now());
        history.setHistoryCode(historyCode);
        return history;
    }

    public static History builder(long taskId, Status status) {
        HistoryEnum historyCode = HistoryEnum.UPDATE_TASK;
        if(status == Status.TODO) {
            historyCode = HistoryEnum.CHANGE_STATUS_TODO;
        } else if(status == Status.IN_PROGRESS) {
            historyCode = HistoryEnum.CHANGE_STATUS_IN_PROGRESS;
        } else if(status == Status.DONE) {
            historyCode = HistoryEnum.CHANGE_STATUS_DONE;
        } else if(status == Status.SUSPENDED) {
            historyCode = HistoryEnum.CHANGE_STATUS_SUSPENDED;
        }
        return builder(taskId, historyCode);
    }
}
