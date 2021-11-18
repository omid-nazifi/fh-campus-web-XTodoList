package edu.campuswien.webproject.todolist.controller;

import edu.campuswien.webproject.todolist.dto.TaskDto;
import edu.campuswien.webproject.todolist.exception.ErrorModel;
import edu.campuswien.webproject.todolist.exception.InputValidationException;
import edu.campuswien.webproject.todolist.exception.SubErrorModel;
import edu.campuswien.webproject.todolist.exception.ValidationError;
import edu.campuswien.webproject.todolist.model.Task;
import edu.campuswien.webproject.todolist.service.TaskService;
import edu.campuswien.webproject.todolist.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
        return new TaskDto(); //not exist
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

    private boolean validateTask(TaskDto taskDto, boolean isUpdate) throws InputValidationException {
        List<SubErrorModel> errors = new ArrayList<>();
        if(isUpdate && taskService.getTaskById(taskDto.getId()).isEmpty()) {
            errors.add(new ValidationError("Id", "This task does not exist!"));
        }
        if(taskDto.getUserId() != null && userService.getUserById(taskDto.getUserId()).isEmpty()) {
            errors.add(new ValidationError("UserId", "User does not exist!"));
        }
        if(taskDto.getParentId() != null && taskService.getTaskById(taskDto.getParentId()).isEmpty()) {
            errors.add(new ValidationError("ParentId", "Parent does not exist!"));
        }

        if(!errors.isEmpty()) {
            ErrorModel errorModel = new ErrorModel(HttpStatus.BAD_REQUEST, "Validation errors");
            errorModel.setSubErrors(errors);
            throw new InputValidationException(errorModel, "Validation error in the TaskController.validateTask()!");
        }

        return true;
    }

}
