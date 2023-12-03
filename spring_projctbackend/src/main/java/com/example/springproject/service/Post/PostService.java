package com.example.springproject.service.Post;

import com.example.springproject.domain.Post;
import com.example.springproject.dto.Room.RoomDto;
import com.example.springproject.dto.student.PostDto;
import com.example.springproject.dto.student.Post_replyDto;

import java.util.List;
import java.util.Optional;

public interface PostService {

    public Post createpost(PostDto postDto);
    public boolean createpost_reply(Post_replyDto post_replyDto);
    public Optional<Post> loadpost();

    public Post getpostbyid(int id);

    public List<Post_replyDto> getpostreply(int postid);
    public List<Post_replyDto> getpostupperreply(int replyid);


}
