package edu.campuswien.webproject.todolist.repository;

import edu.campuswien.webproject.todolist.model.Task;
import edu.campuswien.webproject.todolist.service.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    Optional<Task> findById(Long taskId);

    List<Task> findByParentId(Long parentId);

    List<Task> findByUserIdOrderByPriorityAsc(Long userid);

    List<Task> findByUserIdAndStatusOrderByPriorityAsc(Long userid, Status status);

    List<Task> findByStatus(int status);

    List<Task> findByPriority(int priority);

    List<Task> findByDeadlineIsBetween(LocalDateTime start, LocalDateTime end);

    List<Task> findByTags(String tag);

    List<Task> findByTagsIn(List<String> tags);
}
