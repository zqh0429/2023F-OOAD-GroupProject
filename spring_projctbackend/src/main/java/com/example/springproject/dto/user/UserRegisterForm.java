package com.example.springproject.dto.user;

import com.example.springproject.domain.UserInfo;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(description = "user register form")
public class UserRegisterForm {
    @NotBlank(message = "UserId shouldn't be null")
    @Length(min = 8, max = 8, message = "UserId must be 8 bits")
    @ApiModelProperty(value = "userId")
    private String userId;

    @NotBlank(message = "Username shouldn't be null")
    @ApiModelProperty(value = "username")
    private String username;

    @Length(min = 6, message = "Password need at least 6 bits")
    @ApiModelProperty(value = "password")
    private String password;

    @NotBlank(message = "Confirm password shouldn't be null")
    @ApiModelProperty(value = "confirmPassword")
    private String confirmPassword;

    public boolean checkPasswordEquals(){
        return this.password.equals(this.confirmPassword);
    }

    public UserInfo convertToUser(){
        return new UserInfo(userId, username, password, 1);
    }
}
