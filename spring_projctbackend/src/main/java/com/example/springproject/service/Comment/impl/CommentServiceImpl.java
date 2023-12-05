package com.example.springproject.service.Comment.impl;

import com.example.springproject.domain.StudentInfo;
import com.example.springproject.domain.comment;
import com.example.springproject.domain.comment_reply;
import com.example.springproject.domain.RoomInfo;
import com.example.springproject.dto.student.CommentDto;
import com.example.springproject.dto.student.Comment_replyDto;
import com.example.springproject.dto.Room.RoomDto;
import com.example.springproject.repository.CommentRepository;
import com.example.springproject.repository.Comment_replyRepository;
import com.example.springproject.repository.RoomRepository;
import com.example.springproject.repository.StudentRepository;
import com.example.springproject.service.Comment.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Slf4j
@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final Comment_replyRepository comment_replyRepository;
    private final StudentRepository studentRepository;
    private final RoomRepository roomRepository;

    public CommentServiceImpl(CommentRepository commentRepository, Comment_replyRepository commentReplyRepository, StudentRepository studentRepository, RoomRepository roomRepository) {
        this.commentRepository = commentRepository;
        comment_replyRepository = commentReplyRepository;
        this.studentRepository = studentRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    public comment createcomment(CommentDto commentDto) {
        StudentInfo studentInfo=studentRepository.findStudentInfoByStudentId(commentDto.getComment_student());

        RoomInfo RoomInfo =roomRepository.findAllById(commentDto.getComment_room());
        comment comment=new comment(studentInfo, RoomInfo,commentDto.getContent());
        return commentRepository.save(comment);
    }

    @Override
    public boolean createcomment_reply(Comment_replyDto comment_replyDto) {
        StudentInfo studentInfo=studentRepository.findStudentInfoByStudentId(comment_replyDto.getReply_user());
        comment comment=commentRepository.findById(comment_replyDto.getReply_comment());
        if (comment_replyDto.getFloor()==2){
        comment_reply c=comment_replyRepository.findById(comment_replyDto.getUpperreply_id());
            comment_reply comment_reply=new comment_reply(comment_replyDto.getFloor(),comment_replyDto.getContent(),comment,studentInfo,c);
            comment_replyRepository.save(comment_reply);
            return true;
        }else {
            comment_reply comment_reply=new comment_reply(comment_replyDto.getFloor(),comment_replyDto.getContent(),comment,studentInfo);
            comment_replyRepository.save(comment_reply);
            return true;
        }

    }

    @Override
    public List<comment> getcomment(int roomid) {

        return commentRepository.getcommentidByroomid(roomid);
    }

    @Override
    public List<Comment_replyDto> getcommentreply(int commentId) {
       List<comment_reply> comment_replies=comment_replyRepository.getfirstcomment_replyBycommentid(commentId,1);
        System.out.println(comment_replies.size());
       List<Comment_replyDto> list=new ArrayList<>();
        for (comment_reply e:comment_replies
             ) {
            Comment_replyDto comment_replyDto=new Comment_replyDto(e.getReply_content(), e.getReply_floor(),e.getReply_User().getStudentId(),e.getReply_comment().getId(),e.getId(),0);
        list.add(comment_replyDto);
        }
        return list;
    }

    @Override
    public List<Comment_replyDto> getcommentupperreply(int upperreplyId) {
    List<Integer> idlist=comment_replyRepository.getsecond_replyidByfirstreplyid(upperreplyId);
        System.out.println(idlist.size());
    List<comment_reply> list=new ArrayList<>();
        for (int id:idlist
             ) {
            list.add(comment_replyRepository.findById(id));
        }
        List<Comment_replyDto> commentReplyDtos=new ArrayList<>();
        for (comment_reply e:list
             ) {
            Comment_replyDto comment_replyDtos=new Comment_replyDto(e.getReply_content(), e.getReply_floor(),e.getReply_User().getStudentId(),e.getReply_comment().getId(),e.getId(),e.getUpperreply().getId());
        commentReplyDtos.add(comment_replyDtos);
        }
        return commentReplyDtos;
    }




}
