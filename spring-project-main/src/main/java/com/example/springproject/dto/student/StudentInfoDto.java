package com.example.springproject.dto.student;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
//用于传输
@Data
@Builder
@ApiModel
@NoArgsConstructor
@AllArgsConstructor
public class StudentInfoDto {

    @ApiModelProperty
    private String username;
    @ApiModelProperty
    private String studentID;
    @ApiModelProperty
    private String level;
    @ApiModelProperty
    private String circleUrl;
    @ApiModelProperty
    private String restTime;
    @ApiModelProperty
    private String hometown;
    @ApiModelProperty
    private String description;

}
