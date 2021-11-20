package edu.campuswien.webproject.todolist.controller;

import edu.campuswien.webproject.todolist.dto.HistoryDto;
import edu.campuswien.webproject.todolist.model.History;
import edu.campuswien.webproject.todolist.service.HistoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@Validated
public class HistoryController {

    private final HistoryService historyService;
    private final ModelMapper modelMapper;

    @Autowired
    public HistoryController(HistoryService historyService, ModelMapper modelMapper) {
        this.historyService = historyService;
        this.modelMapper = modelMapper;
    }

    @CrossOrigin(origins="*")
    @GetMapping(path = "/Histories/task/{taskId}")
    public List<HistoryDto> getHistoriesOfTask(@PathVariable long taskId) {
        List<History> histories = historyService.getHistoriesByTaskId(taskId);
        List<HistoryDto> historiesData = new ArrayList<>();
        for (History history : histories) {
            historiesData.add(convertToDto(history));
        }
        return historiesData;
    }

    private HistoryDto convertToDto(History history) {
        HistoryDto historyDto = modelMapper.map(history, HistoryDto.class);
        historyDto.setText(history.getHistoryCode().getDescription());
        return historyDto;
    }

}
