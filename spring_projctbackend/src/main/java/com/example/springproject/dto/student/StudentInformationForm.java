package com.example.springproject.dto.student;

import com.example.springproject.domain.StudentInfo;
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
@ApiModel(description = "student information form")
public class StudentInformationForm {
    @ApiModelProperty
    private String studentId;

    @NotBlank(message = "Gender shouldn't be null")
    @ApiModelProperty(value = "gender")
    private String gender;

    @NotBlank(message = "Degree shouldn't be null")
    @ApiModelProperty(value = "degree")
    private String degree;

    @NotBlank(message = "Major shouldn't be null")
    @ApiModelProperty(value = "major")
    private String major;

    @NotBlank(message = "undergraduateSchool shouldn't be null")
    @ApiModelProperty(value = "undergraduateSchool")
    private String undergraduateSchool;

    @ApiModelProperty(value = "studentDescription")
    private String studentDescription;

//    public StudentInfo convertToStudent() {
//        return new StudentInfo()
//    }
}
