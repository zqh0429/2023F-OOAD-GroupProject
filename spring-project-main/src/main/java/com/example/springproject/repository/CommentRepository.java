package com.example.springproject.repository;

import com.example.springproject.domain.comment;
import com.example.springproject.dto.student.CommentDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<comment,Integer> {

    @Query("SELECT new com.example.springproject.dto.student.CommentDto(c.comment_content, c.comment_student.studentId,c.id) FROM comment c WHERE c.comment_room.roomId = :roomid")
    List<CommentDto> getcommentByroomid(@Param("roomid") int roomid);

    @Query("SELECT c.id FROM comment c WHERE c.comment_student.studentId = :userid")
    List<Integer> getcommentByuserid(@Param("userid") String userid);

    public comment findById(int id);
}
