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
public class comment_reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    private int reply_floor;
    @Temporal(TemporalType.TIMESTAMP)
    private Date reply_date;


//    @Lob // 使用 @Lob 注解表示这个字段是一个大对象，适用于 text 类型
//    @Column(name = "reply_content", columnDefinition = "text")
    @NotNull
    private String reply_content;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "reply_comment",referencedColumnName = "id")
    private comment reply_comment;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "reply_User",referencedColumnName = "studentId")
    private StudentInfo reply_User;


    @ManyToOne
    @JoinColumn(name = "upperreply",referencedColumnName = "id")
    private comment_reply upperreply;
    public comment_reply(int reply_floor, String reply_content, comment reply_comment, StudentInfo reply_User) {
        this.reply_floor = reply_floor;
        this.reply_content = reply_content;
        this.reply_comment = reply_comment;
        this.reply_User=reply_User;
    }
    @PrePersist
    protected void onCreate() {
        if (reply_date == null) {
            reply_date = new Date();
        }
    }
    public comment_reply(int reply_floor, String reply_content, comment reply_comment, StudentInfo reply_User,comment_reply comment_reply) {
        this.reply_floor = reply_floor;
        this.reply_content = reply_content;
        this.reply_comment = reply_comment;
        this.reply_User=reply_User;
        this.upperreply=comment_reply;
    }

    public comment_reply() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public comment getReply_comment() {
        return reply_comment;
    }

    public void setReply_comment(comment reply_comment) {
        this.reply_comment = reply_comment;
    }

    public StudentInfo getReply_User() {
        return reply_User;
    }

    public void setReply_User(StudentInfo reply_User) {
        this.reply_User = reply_User;
    }
}
