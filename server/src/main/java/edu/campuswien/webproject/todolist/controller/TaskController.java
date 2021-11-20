package edu.campuswien.webproject.todolist.controller;

import edu.campuswien.webproject.todolist.dto.TaskDto;
import edu.campuswien.webproject.todolist.exception.ErrorModel;
import edu.campuswien.webproject.todolist.exception.InputValidationException;
import edu.campuswien.webproject.todolist.exception.SubErrorModel;
import edu.campuswien.webproject.todolist.exception.ValidationError;
import edu.campuswien.webproject.todolist.model.History;
import edu.campuswien.webproject.todolist.model.HistoryEnum;
import edu.campuswien.webproject.todolist.model.Status;
import edu.campuswien.webproject.todolist.model.Task;
import edu.campuswien.webproject.todolist.service.*;
import edu.campuswien.webproject.todolist.validation.OnCreate;
import edu.campuswien.webproject.todolist.validation.OnUpdate;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@Validated
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;
    private final HistoryService historyService;
    private final ModelMapper modelMapper;

    @Autowired
    public TaskController(TaskService taskService, UserService userService,
                          HistoryService historyService, ModelMapper modelMapper) {
        this.taskService = taskService;
        this.userService = userService;
        this.historyService = historyService;
        this.modelMapper = modelMapper;
    }

    @CrossOrigin(origins="*")
    @PostMapping(path = "/tasks")
    public TaskDto createTask(@Validated(OnCreate.class) @RequestBody TaskDto taskDto) throws Exception {
        validateTask(taskDto, false);

        Task task = convertToEntity(taskDto, Optional.empty());
        task = taskService.createTask(task);

        historyService.create(History.builder(task.getId(), HistoryEnum.CREATE_TASK));

        return convertToDto(task);
    }

    @CrossOrigin(origins="*")
    @PutMapping(path = "/tasks")
    public TaskDto updateTask(@Validated(OnUpdate.class) @RequestBody TaskDto taskDto) throws Exception {
        validateTask(taskDto, true);
        Optional<Task> optTask = taskService.getTaskById(taskDto.getId());
        Task task = convertToEntity(taskDto, optTask);

        boolean isStatusChanged = false;
        if(optTask.get().getStatus() != task.getStatus()) {
            isStatusChanged = true;
        }

        task = taskService.updateTask(task);
        historyService.create(History.builder(task.getId(), HistoryEnum.UPDATE_TASK));
        if(isStatusChanged) {
            historyService.create(History.builder(task.getId(), task.getStatus()));
        }

        return convertToDto(task);
    }

    @CrossOrigin(origins="*")
    @GetMapping(path = "/tasks/{id}")
    public TaskDto getTask(@PathVariable long id) {
        Optional<Task> task = taskService.getTaskById(id);
        if(task.isPresent()) {
            return convertToDto(task.get());
        }
        return new TaskDto(); //not exist
    }

    @CrossOrigin(origins="*")
    @GetMapping(path = "/tasks/parent/{parentId}")
    public List<TaskDto> getTasksOfParent(@PathVariable long parentId) {
        List<Task> tasks = taskService.getTasksByParentId(parentId);
        List<TaskDto> tasksData = new ArrayList<>();
        for (Task task: tasks) {
            tasksData.add(convertToDto(task));
        }
        return tasksData;
    }

    @CrossOrigin(origins="*")
    @GetMapping(path = {"/tasks/user/{userId}", "/tasks/user/{userId}/status/{status}"})
    public List<TaskDto> getTasksOfUser(@PathVariable long userId, @PathVariable(required = false) String status) throws Exception {
        List<Task> tasks;
        if(status != null) {
            try {
                tasks = taskService.getTasksByUserId(userId, Status.valueOf(status));
            } catch (IllegalArgumentException e) {
                ErrorModel errorModel = new ErrorModel(HttpStatus.BAD_REQUEST, "Status is wrong!", e);
                throw new InputValidationException(errorModel, e.getMessage());
            }
        } else {
            tasks = taskService.getTasksByUserId(userId);
        }

        List<TaskDto> tasksData = new ArrayList<>();
        for (Task task: tasks) {
            tasksData.add(convertToDto(task));
        }
        return tasksData;
    }

    /*TODO archive a task
    @CrossOrigin(origins="*")
    @DeleteMapping(path = "/tasks/{id}")
    public Boolean deleteTask(@PathVariable long id) {
        Optional<Task> task = taskService.getTaskById(id);
        if(task.isPresent()) {
            return convertToDto(task.get());
        }
        return new TaskDto(); //not exist
    }*/

    private TaskDto convertToDto(Task task) {
        return modelMapper.map(task, TaskDto.class);
    }

    private Task convertToEntity(TaskDto taskDto, Optional<Task> optTask) {
        Task mappedTask = modelMapper.map(taskDto, Task.class);
        if(optTask.isPresent()) {//Update
            Task oldTask = optTask.get();
            mappedTask.setCreationTime(oldTask.getCreationTime());
        }
        if(mappedTask.getCreationTime() == null) {
            mappedTask.setCreationTime(LocalDateTime.now());
        }
        if(mappedTask.getModifiedTime() == null) {
            mappedTask.setModifiedTime(LocalDateTime.now());
        }
        return mappedTask;
    }

    private void validateTask(TaskDto taskDto, boolean isUpdate) throws InputValidationException {
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
    }

}
