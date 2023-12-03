package com.example.springproject.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Builder
@Data
@AllArgsConstructor
public class Replies {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reply_id;

    @NotNull
    private int reply_floor;
    @Temporal(TemporalType.TIMESTAMP)
    private Date reply_date;

    @NotNull
    private String reply_content;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "reply_post",referencedColumnName = "post_id")
    private Post reply_post;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "reply_User",referencedColumnName = "studentId")
    private StudentInfo reply_User;


    @ManyToOne
    @JoinColumn(name = "upperreply",referencedColumnName = "reply_id")
    private Replies upperreply;
    public Replies() {

    }

    public Replies(int reply_floor, String reply_content, Post reply_post, StudentInfo reply_User) {
        this.reply_floor = reply_floor;
        this.reply_content = reply_content;
        this.reply_post = reply_post;
        this.reply_User = reply_User;
    }

    public Replies(int reply_floor, String reply_content, Post reply_post, StudentInfo reply_User, Replies upperreply) {
        this.reply_floor = reply_floor;
        this.reply_content = reply_content;
        this.reply_post = reply_post;
        this.reply_User = reply_User;
        this.upperreply = upperreply;
    }

    protected void onCreate() {
        if (reply_date == null) {
            reply_date = new Date();
        }
    }
    public int getReply_id() {
        return reply_id;
    }

    public void setReply_id(int id) {
        this.reply_id = id;
    }

    public int getReply_floor() {
        return reply_floor;
    }

    public void setReply_floor(int reply_floor) {
        this.reply_floor = reply_floor;
    }

    public Date getReply_date() {
        return reply_date;
    }

    public void setReply_date(Date reply_date) {
        this.reply_date = reply_date;
    }

    public String getReply_content() {
        return reply_content;
    }

    public void setReply_content(String reply_content) {
        this.reply_content = reply_content;
    }

    public Post getReply_post() {
        return reply_post;
    }

    public void setReply_post(Post reply_post) {
        this.reply_post = reply_post;
    }

    public StudentInfo getReply_User() {
        return reply_User;
    }

    public void setReply_User(StudentInfo reply_User) {
        this.reply_User = reply_User;
    }
}
