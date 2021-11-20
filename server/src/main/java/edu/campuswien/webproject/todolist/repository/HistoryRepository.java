package edu.campuswien.webproject.todolist.repository;

import edu.campuswien.webproject.todolist.model.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
    @Override
    Optional<History> findById(Long id);

    List<History> findByTaskIdOrderByCreationTimeAsc(Long taskId);
}
