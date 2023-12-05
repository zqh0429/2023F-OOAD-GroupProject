package com.example.springproject.controller;


import com.example.springproject.domain.comment;
import com.example.springproject.domain.comment_reply;
import com.example.springproject.domain.message;
import com.example.springproject.dto.student.Comment_replyDto;
import com.example.springproject.dto.student.MessageDto;
import com.example.springproject.dto.student.StudentDto;
import com.example.springproject.dto.user.UserDto;
import com.example.springproject.service.Message.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/v2/message")
public class MessageController {
    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    //发送信息，在组队invite功能时也封装一个message发送
    @PostMapping("/v1/creatmessage")
    public message createmessage(@RequestBody MessageDto messageDto) {
        System.out.println(messageDto);
        return messageService.sendmessage(messageDto);
    }


    //一般message，如组队，一对一聊天
    @GetMapping("/v2/message/normalmessage/{userId}")
    public List<message> listmessage(@RequestParam String userId){
        return messageService.getmessage(userId);
    }

    //评论回复信息通知
    @GetMapping("/v2/message/replymessage/{userId}")
    public List<MessageDto> listreplymessage(@RequestParam String userId){
        return messageService.getcomment_reply(userId);
    }
}
