package com.example.springproject.controller;

import com.example.springproject.domain.comment;

import com.example.springproject.domain.comment_reply;
import com.example.springproject.dto.student.CommentDto;
import com.example.springproject.dto.student.Comment_replyDto;
import com.example.springproject.dto.Room.RoomDto;
import com.example.springproject.service.Comment.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/v1")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    //根据roomid得到room的comment
    @GetMapping("/comments")
    public List<comment> listcomment(@RequestBody RoomDto roomDto){
        System.out.println(roomDto);
        return commentService.getcomment(roomDto);
    }

    //评论房间
    @PostMapping("/addComment")
    public comment createComment(@RequestBody CommentDto commentDto) {
        System.out.println(commentDto);
        return commentService.createcomment(commentDto);
    }

    //对comment做一级回复和二级回复，二级回复的话传入的时候需传入一级回复id
    @PostMapping("/v1/createreply")
    public boolean createReply(@RequestBody Comment_replyDto comment_replyDto) {
        System.out.println(comment_replyDto);
        return commentService.createcomment_reply(comment_replyDto);
    }

    //得到comment的一级回复
    @GetMapping("/v1/getreply")
    public List<Comment_replyDto> listcomment_reply(@RequestBody CommentDto commentDto){
        System.out.println(commentDto);
        return commentService.getcommentreply(commentDto);
    }

    //得到一级回复的二级回复
    @GetMapping("/v1/comments/getreply/upperreply")
    public List<Comment_replyDto> listcomment_upperreply(@RequestBody Comment_replyDto comment_replyDto){
        System.out.println(comment_replyDto);
        return commentService.getcommentupperreply(comment_replyDto);
    }
}
