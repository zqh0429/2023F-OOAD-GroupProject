package com.example.springproject.service.Post.impl;

import com.example.springproject.domain.*;
import com.example.springproject.dto.student.Comment_replyDto;
import com.example.springproject.dto.student.PostDto;
import com.example.springproject.dto.student.Post_replyDto;
import com.example.springproject.dto.student.PostiniDto;
import com.example.springproject.repository.PostRepository;
import com.example.springproject.repository.Post_replyRepository;
import com.example.springproject.repository.StudentRepository;
import com.example.springproject.service.Post.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
public class PostServiceImpl  implements PostService {
    private final PostRepository postRepository;
    private final StudentRepository studentRepository;

    private final Post_replyRepository postReplyRepository;

    public PostServiceImpl(PostRepository postRepository, StudentRepository studentRepository, Post_replyRepository postReplyRepository) {
        this.postRepository = postRepository;
        this.studentRepository = studentRepository;
        this.postReplyRepository = postReplyRepository;
    }

    @Override
    public Post createpost(PostDto postDto) {

        StudentInfo studentInfo=studentRepository.findStudentInfoByStudentId(postDto.getUser());
        Post post=new Post(postDto.getSleep(),postDto.getWake(), postDto.getContent(), postDto.getTitle(), studentInfo);
        return postRepository.save(post);
    }

    @Override
    public boolean createpost_reply(Post_replyDto post_replyDto) {
        StudentInfo studentInfo=studentRepository.findStudentInfoByStudentId(post_replyDto.getReply_user());
        System.out.println(1);
        Post post=postRepository.getPostByPost_id(post_replyDto.getReply_post());
        if (post_replyDto.getFloor()==2){
            Replies c=postReplyRepository.findById(post_replyDto.getUpperreply_id());
            Replies replies=new Replies(post_replyDto.getFloor(),post_replyDto.getContent(),post,studentInfo,c);
            postReplyRepository.save(replies);
            return true;
        }else {
            Replies reply=new Replies(post_replyDto.getFloor(),post_replyDto.getContent(),post,studentInfo);
            postReplyRepository.save(reply);
            return true;
        }

    }

    @Override
    public List<PostiniDto> loadpost() {
        System.out.println(1);
       return postRepository.loadpostidandtitle();

    }

    @Override
    public PostDto getpostbyid(int id) {
        Post post= postRepository.getPostByPost_id(id);
        return new  PostDto(post.getTitle(), post.getPost_User().getStudentId(),post.getSleep_time(),post.getWake_time(), post.getPost_content());
    }

    @Override
    public List<Post_replyDto> getpostreply(int postid) {
        List<Replies> replies=postReplyRepository.getfirstpost_replyBypostid(postid,1);
        List<Post_replyDto> list=new ArrayList<>();
        for (Replies e:replies
        ) {
            Post_replyDto post_replyDto=new Post_replyDto(e.getReply_content(), e.getReply_floor(),e.getReply_User().getStudentId(),e.getReply_post().getPost_id(),e.getReply_id(),0);
           list.add(post_replyDto);
        }
        return list;
    }

    @Override
    public List<Post_replyDto> getpostupperreply(int replyid) {
        List<Integer> idlist=postReplyRepository.getsecond_replyidByfirstreplyid(replyid);
        System.out.println(idlist.size());
        List<Replies> list=new ArrayList<>();
        for (int id:idlist
        ) {
            list.add(postReplyRepository.findById(id));
        }
        List<Post_replyDto> postReplyDtos=new ArrayList<>();
        for (Replies e:list
        ) {
            Post_replyDto post_replyDtos=new Post_replyDto(e.getReply_content(), e.getReply_floor(),e.getReply_User().getStudentId(),e.getReply_post().getPost_id(),e.getReply_id(),e.getUpperreply().getReply_id());
            postReplyDtos.add(post_replyDtos);
        }
        return postReplyDtos;
    }
}
