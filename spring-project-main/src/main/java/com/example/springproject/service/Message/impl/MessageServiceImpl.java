package com.example.springproject.service.Message.impl;


import com.example.springproject.domain.StudentInfo;
import com.example.springproject.domain.comment_reply;
import com.example.springproject.domain.message;
import com.example.springproject.dto.student.MessageDto;
import com.example.springproject.dto.student.StudentDto;
import com.example.springproject.dto.user.UserDto;
import com.example.springproject.repository.CommentRepository;
import com.example.springproject.repository.Comment_replyRepository;
import com.example.springproject.repository.MessageRepository;
import com.example.springproject.repository.StudentRepository;
import com.example.springproject.service.Message.MessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class MessageServiceImpl implements MessageService {
    private final MessageRepository messageRepository;
    private final CommentRepository commentRepository;
    private final Comment_replyRepository comment_replyRepository;
    private final StudentRepository studentRepository;
    public MessageServiceImpl(MessageRepository messageRepository, CommentRepository commentRepository, Comment_replyRepository commentReplyRepository, StudentRepository studentRepository) {
        this.messageRepository = messageRepository;
        this.commentRepository = commentRepository;
        comment_replyRepository = commentReplyRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public List<message> getmessage(UserDto userDto) {
     //   StudentInfo studentInfo=studentRepository.findStudentInfoByStudentId(userDto.getUserId());

        return messageRepository.getmessageByuserid(userDto.getUserId());
    }

    @Override
    public List<MessageDto> getcomment_reply(UserDto userDto) {
        List<Integer> comments=commentRepository.getcommentByuserid(userDto.getUserId());
        List<comment_reply> list=new ArrayList<>();
        for (int c:comments) {
            list.addAll(comment_replyRepository.getfirstcomment_replyBycommentid(c,1));
        }
        List<Integer> comment_re=comment_replyRepository.getcomment_replyidByuserid(userDto.getUserId());
        List<Integer> upper_re=new ArrayList<>();
        for (int e:comment_re
             ) {
            upper_re.addAll(comment_replyRepository.getsecond_replyidByfirstreplyid(e));
        }
        for (int d:upper_re
             ) {
            list.add(comment_replyRepository.findById(d));
        }
        List<MessageDto> messages=new ArrayList<>();
        for (comment_reply r:list
             ) {
            MessageDto messageDto=new MessageDto(r.getReply_User().getStudentId(),r.getReply_content(), userDto.getUserId(), r.getReply_date());
       messages.add(messageDto);
        }
        return messages;
    }

    @Override
    public message sendmessage(MessageDto messageDto) {
        StudentInfo sender=studentRepository.findStudentInfoByStudentId(messageDto.getSenderid());
        StudentInfo recever=studentRepository.findStudentInfoByStudentId(messageDto.getReceiverid());
    message message=new message(messageDto.getContent(),recever,sender);
    messageRepository.save(message);
        return null;
    }
}
