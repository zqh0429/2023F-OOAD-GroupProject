package com.example.springproject.dto.teacher;

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
@ApiModel(description = "Teacher register student account form")
public class StudentAccountRegisterForm {
    private String teacherId;

    @NotBlank(message = "StudentId shouldn't be null")
    @Length(min = 8, max = 8, message = "StudentId must be 8 bits")
    @ApiModelProperty(value = "studentId")
    private String studentId;

    @NotBlank(message = "StudentName shouldn't be null")
    @ApiModelProperty(value = "studentName")
    private String studentName;

    private String password;
}