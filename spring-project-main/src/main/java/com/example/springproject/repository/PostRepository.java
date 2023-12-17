package com.example.springproject.repository;

import com.example.springproject.domain.Post;
import com.example.springproject.domain.message;
import com.example.springproject.dto.student.PostiniDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post,Integer> {
    @Query("SELECT new com.example.springproject.dto.student.PostiniDto(p.post_id, p.title) FROM Post p")
    List<PostiniDto> loadpostidandtitle();

    @Transactional
    @Query("SELECT c FROM Post c where c.post_id = :postid ")
    Post getPostByPost_id(@Param("postid") int postid);

    @Query("SELECT c.post_id FROM Post c WHERE c.post_User.studentId = :userid")
    List<Integer> getpostidByuserid(@Param("userid") String userid);

}
