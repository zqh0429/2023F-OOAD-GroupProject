package com.example.springproject.dto.student;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @ApiModelProperty
    private LocalTime wake;
    @ApiModelProperty
    private LocalTime sleep;
    @ApiModelProperty
    private String title;
}
