package edu.campuswien.webproject.todolist.controller;

import edu.campuswien.webproject.todolist.dto.TaskDto;
import edu.campuswien.webproject.todolist.model.Task;
import edu.campuswien.webproject.todolist.service.Priority;
import edu.campuswien.webproject.todolist.service.Status;
import edu.campuswien.webproject.todolist.service.TaskService;
import edu.campuswien.webproject.todolist.service.UserService;
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
    private final UserService userService;
    private ModelMapper modelMapper;

    @Autowired
    public TaskController(TaskService taskService, UserService userService, ModelMapper modelMapper) {
        this.taskService = taskService;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @CrossOrigin(origins="*")
    @PostMapping(path = "/add")
    public TaskDto add(@Valid @RequestBody TaskDto taskDto) throws Exception {
        validateTask(taskDto, false);

        Task task = convertToEntity(taskDto);
        task = taskService.createTask(task);
        return convertToDto(task);
    }

    @CrossOrigin(origins="*")
    @PutMapping(path = "/update")
    public TaskDto update(@Valid @RequestBody TaskDto taskDto) throws Exception {
        validateTask(taskDto, true);

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
    public List<TaskDto> getAllOfParent(@PathVariable long parentId) {
        List<Task> tasks = taskService.getTasksByParentId(parentId);
        List<TaskDto> tasksData = new ArrayList<>();
        for (Task task: tasks) {
            tasksData.add(convertToDto(task));
        }
        return tasksData;
    }

    @CrossOrigin(origins="*")
    @GetMapping(path = {"/user/{userId}", "/user/{userId}/{status}"})
    public List<TaskDto> getAllOfUser(@PathVariable long userId, @PathVariable(required = false) Integer status) {
        List<Task> tasks;
        if(status != null) {
            tasks = taskService.getTasksByUserId(userId, status);
        } else {
            tasks = taskService.getTasksByUserId(userId);
        }
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

    private boolean validateTask(TaskDto taskDto, boolean isUpdate) throws Exception {
        if(taskService.getTaskById(taskDto.getId()) == null) {
            //TODO Error
            throw new Exception("This task does not exist!");
        }
        if(taskDto.getUserId() != null && userService.getUserById(taskDto.getUserId()) == null) {
            //TODO Error
            throw new Exception("User does not exist!");
        }
        if(taskDto.getParentId() != null && taskService.getTaskById(taskDto.getParentId()) == null) {
            //TODO Error
            throw new Exception("Parent does not exist!");
        }

        if(Status.getById(taskDto.getStatus()) == Status.Unknown) {
            //TODO Error
            throw new Exception("Status is incorrect!");
        }

        if(Priority.getById(taskDto.getPriority()) == Priority.Unknown) {
            //TODO Error
            throw new Exception("Priority is incorrect!");
        }
        return true;
    }

}
