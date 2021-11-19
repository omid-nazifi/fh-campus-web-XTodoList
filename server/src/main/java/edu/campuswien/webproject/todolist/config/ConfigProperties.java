package edu.campuswien.webproject.todolist.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Getter
@Component
@PropertySource("classpath:application.properties")
public class ConfigProperties {
    @Value("${application.config.debug.mode: false}")
    private boolean debugMode;
}
