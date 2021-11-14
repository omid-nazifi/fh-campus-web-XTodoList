package edu.campuswien.webproject.todolist.service;

import edu.campuswien.webproject.todolist.model.Task;
import edu.campuswien.webproject.todolist.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }


    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        if(task.getParentId() != null && task.getParentId() == 0) {
            task.setParentId(null);
        }
        return taskRepository.save(task);
    }

    public Task updateTask(Task task) {
        if(task.getParentId() != null && task.getParentId() == 0) {
            task.setParentId(null);
        }
        return taskRepository.save(task); //TODO same as create
    }

    public List<Task> getTasksByParentId(long parentId) {
        return taskRepository.findByParentId(parentId);
    }
}
