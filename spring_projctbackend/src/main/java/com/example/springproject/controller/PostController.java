package com.example.springproject.controller;


import com.example.springproject.domain.Post;
import com.example.springproject.domain.Replies;
import com.example.springproject.domain.RoomInfo;
import com.example.springproject.dto.Room.RoomDto;
import com.example.springproject.dto.student.CommentDto;
import com.example.springproject.dto.student.Comment_replyDto;
import com.example.springproject.dto.student.PostDto;
import com.example.springproject.dto.student.Post_replyDto;
import com.example.springproject.service.Post.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/forum")
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/loadpost")
    public Optional<Post> loadposttitleandid(){
        return postService.loadpost();
    }

    @GetMapping("/searchPost/{postId}")
    public Post loadposttitleandid(@RequestParam int postId){
        return postService.getpostbyid(postId);
    }

    @PostMapping("/createpost")
    public Post creatPost(@RequestBody PostDto postDto) {
        System.out.println(postDto);
        return postService.createpost(postDto);
    }


    @PostMapping("/createreply")
    public boolean createReply(@RequestBody Post_replyDto post_replyDto) {
        return postService.createpost_reply(post_replyDto);
    }
    //得到post的一级回复
    @GetMapping("/getreply")
    public List<Post_replyDto> listpost_reply(@RequestParam int postid){
        return postService.getpostreply(postid);
    }

    //得到一级回复的二级回复
    @GetMapping("/getreply/upperreply")
    public List<Post_replyDto> listpost_upperreply(@RequestParam int reply_id){

        return postService.getpostupperreply(reply_id);
    }


}
