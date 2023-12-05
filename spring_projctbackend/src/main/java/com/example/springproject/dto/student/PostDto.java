package com.example.springproject.dto.student;


import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalTime;
import java.util.Date;

@Data
@Builder
@ApiModel
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    @ApiModelProperty
    private String content;
    @ApiModelProperty
    private String post_student;

    @DateTimeFormat(pattern = "HH:mm:ss")
    @JsonFormat(pattern="HH:mm:ss")
    @ApiModelProperty
    private LocalTime wake;
    @DateTimeFormat(pattern = "HH:mm:ss")
    @JsonFormat(pattern="HH:mm:ss")
    @ApiModelProperty
    private LocalTime sleep;
    @ApiModelProperty
    private String title;


}
