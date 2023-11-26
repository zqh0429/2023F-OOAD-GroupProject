package com.example.springproject.repository;

import com.example.springproject.domain.comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<comment,Integer> {

    @Query("SELECT c FROM comment c WHERE c.comment_room.roomId = :roomid")
    List<comment> getcommentidByroomid(@Param("roomid") int roomid);

    @Query("SELECT c.id FROM comment c WHERE c.comment_student.studentId = :userid")
    List<Integer> getcommentByuserid(@Param("userid") String userid);

    public comment findById(int id);
}
