package com.example.springproject.dto.student;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@ApiModel
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    @ApiModelProperty
    private String content;
    @ApiModelProperty
    private int comment_room;
    @ApiModelProperty
    private String comment_student;
    @ApiModelProperty
    private int comment_id;
}
