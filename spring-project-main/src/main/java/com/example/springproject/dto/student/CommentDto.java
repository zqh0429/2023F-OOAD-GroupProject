package com.example.springproject.dto.student;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
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

    public CommentDto(String content, String comment_student, int comment_id) {
        this.content = content;
        this.comment_student = comment_student;
        this.comment_id = comment_id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setComment_room(int comment_room) {
        this.comment_room = comment_room;
    }

    public void setComment_student(String comment_student) {
        this.comment_student = comment_student;
    }

    public void setComment_id(int comment_id) {
        this.comment_id = comment_id;
    }
}
