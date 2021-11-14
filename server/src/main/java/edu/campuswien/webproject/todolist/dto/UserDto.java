package edu.campuswien.webproject.todolist.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.campuswien.webproject.todolist.validation.OnCreate;
import edu.campuswien.webproject.todolist.validation.OnUpdate;
import edu.campuswien.webproject.todolist.validation.ValidPassword;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.io.Serializable;

@Data
public class UserDto implements Serializable {

    @Null(groups = OnCreate.class)
    @NotNull(groups = OnUpdate.class, message = "id is required!")
    private Long id;

    @NotNull(message = "Name is required!")
    private String name;

    @NotNull
    @NotEmpty
    @Email(message = "Email is not valid!")
    private String username; //email

    //@Getter(onMethod = @__( @JsonIgnore ))
    //@Setter
    @ValidPassword(groups = OnCreate.class, message = "Password is required!")
    @Null(groups = OnUpdate.class)
    private transient String password;
}
