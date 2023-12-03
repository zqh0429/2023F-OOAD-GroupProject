package com.example.springproject.repository;

import com.example.springproject.domain.Replies;
import com.example.springproject.domain.comment_reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Post_replyRepository extends JpaRepository<Replies,Integer> {
    @Query("SELECT c FROM Replies c WHERE c.reply_post.post_id = :postid and c.reply_floor = :floor")
    List<Replies> getfirstpost_replyBypostid(@Param("postid") int postid, @Param("floor") int floor);

    @Query("SELECT c.reply_id FROM Replies c WHERE c.upperreply.reply_id = :post_replyid order by c.reply_date")
    List<Integer> getsecond_replyidByfirstreplyid(@Param("post_replyid") int post_replyid);

    @Query("SELECT c FROM Replies c WHERE c.reply_id = :reply_id")
    public Replies findById(@Param("reply_id") int reply_id);

    @Query("SELECT c.reply_id FROM Replies c WHERE c.reply_User.studentId = :userid ")
    List<Integer> getpost_replyidByuserid(@Param("userid") String userid);
}
