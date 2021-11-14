package edu.campuswien.webproject.todolist.controller;

import edu.campuswien.webproject.todolist.dto.TaskDto;
import edu.campuswien.webproject.todolist.model.Task;
import edu.campuswien.webproject.todolist.service.TaskService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@Validated
@RequestMapping(path = "task")
public class TaskController {

    private final TaskService taskService;
    private ModelMapper modelMapper;

    @Autowired
    public TaskController(TaskService taskService, ModelMapper modelMapper) {
        this.taskService = taskService;
        this.modelMapper = modelMapper;
    }

    @CrossOrigin(origins="*")
    @PostMapping(path = "/add")
    public TaskDto add(@Valid @RequestBody TaskDto taskDto) throws Exception {
        if(taskDto.getParentId() != null && taskService.getTaskById(taskDto.getParentId()) == null) {
            //TODO Error
            throw new Exception("Parent Id is not exist!");
        }
        Task task = convertToEntity(taskDto);
        task = taskService.createTask(task);
        return convertToDto(task);
    }

    @CrossOrigin(origins="*")
    @PutMapping(path = "/update")
    public TaskDto update(@Valid @RequestBody TaskDto taskDto) throws Exception {
        if(taskService.getTaskById(taskDto.getId()) == null) {
            //TODO Error
            throw new Exception("This task is not exist!");
        }
        if(taskDto.getParentId() != null && taskService.getTaskById(taskDto.getParentId()) == null) {
            //TODO Error
            throw new Exception("Parent Id is not exist!");
        }
        Task task = convertToEntity(taskDto);
        task = taskService.updateTask(task);
        return convertToDto(task);
    }

    @CrossOrigin(origins="*")
    @GetMapping(path = "/{id}")
    public TaskDto getTask(@PathVariable long id) {
        Optional<Task> task = taskService.getTaskById(id);
        if(task.isPresent()) {
            return convertToDto(task.get());
        }
        return null; //TODO error
    }

    @CrossOrigin(origins="*")
    @GetMapping(path = "/parent/{parentId}")
    public List<TaskDto> List(@PathVariable long parentId) {
        List<Task> tasks = taskService.getTasksByParentId(parentId);
        List<TaskDto> tasksData = new ArrayList<>();
        for (Task task: tasks) {
            tasksData.add(convertToDto(task));
        }
        return tasksData;
    }



    private TaskDto convertToDto(Task task) {
        TaskDto taskDto = modelMapper.map(task, TaskDto.class);
        return taskDto;
    }

    private Task convertToEntity(TaskDto taskDto) {
        return modelMapper.map(taskDto, Task.class);
    }

}
