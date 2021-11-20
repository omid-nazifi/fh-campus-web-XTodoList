package edu.campuswien.webproject.todolist.service;

import edu.campuswien.webproject.todolist.model.History;
import edu.campuswien.webproject.todolist.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryService {

    private final HistoryRepository historyRepository;

    @Autowired
    public HistoryService(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    public List<History> getHistoriesByTaskId(Long taskId) {
        return historyRepository.findByTaskIdOrderByCreationTimeAsc(taskId);
    }

    public History create(History history) {
        return historyRepository.save(history);
    }

}
