package edu.campuswien.webproject.todolist.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import edu.campuswien.webproject.todolist.validation.ValidPassword;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class NewPasswordDto implements Serializable {
    @NotNull
    private Long userId;

    @Getter(onMethod = @__( @JsonIgnore))
    @Setter(onMethod = @__( @JsonProperty))
    @ValidPassword(message = "Old password is required!")
    @NotNull
    private String oldPassword;

    @Getter(onMethod = @__( @JsonIgnore ))
    @Setter(onMethod = @__( @JsonProperty))
    @ValidPassword(message = "New password is required!")
    @NotNull
    private String newPassword;

    @Getter(onMethod = @__( @JsonIgnore ))
    @Setter(onMethod = @__( @JsonProperty))
    @ValidPassword(message = "Confirm password is required!")
    @NotNull
    private String repeatedNewPassword;
}
