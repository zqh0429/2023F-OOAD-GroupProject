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
public class Post_replyDto {

    @ApiModelProperty
    private String content;
    @ApiModelProperty
    private int floor;
    @ApiModelProperty
    private String reply_user;
    @ApiModelProperty
    private int reply_post;
    @ApiModelProperty
    private int reply_id;
    @ApiModelProperty
    private int upperreply_id;
}
