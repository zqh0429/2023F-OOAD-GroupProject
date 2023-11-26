package com.example.springproject.service.Comment;

import com.example.springproject.domain.comment;
import com.example.springproject.domain.comment_reply;
import com.example.springproject.domain.message;
import com.example.springproject.dto.student.CommentDto;
import com.example.springproject.dto.student.Comment_replyDto;
import com.example.springproject.dto.student.RoomDto;
import com.example.springproject.dto.user.UserDto;

import java.util.List;

public interface CommentService {
    public comment createcomment(CommentDto commentDto);
    public comment_reply createcomment_reply(Comment_replyDto comment_replyDto);
    public List<comment> getcomment(RoomDto roomDto);

    public List<Comment_replyDto> getcommentreply(CommentDto commentDto);
    public List<Comment_replyDto> getcommentupperreply(Comment_replyDto comment_replyDto);


}
