package com.example.springproject.service.Message;

import com.example.springproject.domain.comment_reply;
import com.example.springproject.domain.message;
import com.example.springproject.dto.student.MessageDto;
import com.example.springproject.dto.student.StudentDto;
import com.example.springproject.dto.user.UserDto;

import java.util.List;

public interface MessageService {
    public List<message> getmessage(UserDto userDto);
    public List<MessageDto> getcomment_reply(UserDto userDto);
    //组队消息直接封装成message发送

    public message sendmessage(MessageDto messageDto);
}
