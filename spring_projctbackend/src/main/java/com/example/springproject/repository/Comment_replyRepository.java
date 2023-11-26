package com.example.springproject.repository;

import com.example.springproject.domain.comment_reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Comment_replyRepository extends JpaRepository<comment_reply,Integer> {
    @Query("SELECT c FROM comment_reply c WHERE c.reply_comment.id = :commentid and c.reply_floor = :floor")
    List<comment_reply> getfirstcomment_replyBycommentid(@Param("commentid") int commentid, @Param("floor") int floor);

    @Query("SELECT c.id FROM comment_reply c WHERE c.upperreply.id = :comment_replyid order by c.reply_date")
    List<Integer> getsecond_replyidByfirstreplyid(@Param("comment_replyid") int comment_replyid);

    public comment_reply findById(int id);

    @Query("SELECT c.id FROM comment_reply c WHERE c.reply_User.studentId = :userid ")
    List<Integer> getcomment_replyidByuserid(@Param("userid") String userid);


}
