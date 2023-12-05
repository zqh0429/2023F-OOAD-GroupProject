package com.example.springproject.service.Message.impl;


import com.example.springproject.domain.Replies;
import com.example.springproject.domain.StudentInfo;
import com.example.springproject.domain.comment_reply;
import com.example.springproject.domain.message;
import com.example.springproject.dto.student.MessageDto;
import com.example.springproject.dto.user.UserDto;
import com.example.springproject.repository.*;
import com.example.springproject.service.Message.MessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class MessageServiceImpl implements MessageService {
    private final MessageRepository messageRepository;
    private final CommentRepository commentRepository;
    private final Comment_replyRepository comment_replyRepository;
    private final StudentRepository studentRepository;

    private final PostRepository postRepository;
    private final Post_replyRepository postReplyRepository;
    public MessageServiceImpl(MessageRepository messageRepository, CommentRepository commentRepository, Comment_replyRepository commentReplyRepository, StudentRepository studentRepository, PostRepository postRepository, Post_replyRepository postReplyRepository) {
        this.messageRepository = messageRepository;
        this.commentRepository = commentRepository;
        comment_replyRepository = commentReplyRepository;
        this.studentRepository = studentRepository;
        this.postRepository = postRepository;
        this.postReplyRepository = postReplyRepository;
    }

    @Override
    public List<message> getmessage(String userId) {
     //   StudentInfo studentInfo=studentRepository.findStudentInfoByStudentId(userDto.getUserId());

        return messageRepository.getmessageByuserid(userId);
    }

    @Override
    public List<MessageDto> getcomment_reply(String userId) {
        List<Integer> comments=commentRepository.getcommentByuserid(userId);
        List<Integer> post=postRepository.getpostidByuserid(userId);
        List<comment_reply> list=new ArrayList<>();
        List<Replies> replies=new ArrayList<>();
        for (int c:comments) {
            list.addAll(comment_replyRepository.getfirstcomment_replyBycommentid(c,1));
        }
        for (int c:post) {
            replies.addAll(postReplyRepository.getfirstpost_replyBypostid(c,1));
        }
        List<Integer> comment_re=comment_replyRepository.getcomment_replyidByuserid(userId);
        List<Integer> upper_re=new ArrayList<>();

        List<Integer> post_re=postReplyRepository.getpost_replyidByuserid(userId);
        List<Integer> post_upper_re=new ArrayList<>();

        for (int e:comment_re
             ) {
            upper_re.addAll(comment_replyRepository.getsecond_replyidByfirstreplyid(e));
        }
        for (int d:upper_re
             ) {
            list.add(comment_replyRepository.findById(d));
        }

        for (int e:post_re
        ) {
            post_upper_re.addAll(postReplyRepository.getsecond_replyidByfirstreplyid(e));
        }
        for (int d:post_upper_re
        ) {
            replies.add(postReplyRepository.findById(d));
        }
        List<MessageDto> messages=new ArrayList<>();
        for (comment_reply r:list
             ) {
            MessageDto messageDto=new MessageDto(r.getReply_User().getStudentId(),r.getReply_content(), userId, r.getReply_date());
       messages.add(messageDto);
        }
        for (Replies r:replies
        ) {
            MessageDto messageDto=new MessageDto(r.getReply_User().getStudentId(),r.getReply_content(), userId, r.getReply_date());
            messages.add(messageDto);
        }
        return messages;
    }

    @Override
    public message sendmessage(MessageDto messageDto) {
        StudentInfo sender=studentRepository.findStudentInfoByStudentId(messageDto.getSenderid());
        StudentInfo recever=studentRepository.findStudentInfoByStudentId(messageDto.getReceiverid());
        message message=new message(messageDto.getContent(),recever,sender);
        return messageRepository.save(message);
    }
}
