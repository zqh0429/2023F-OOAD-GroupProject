package com.example.springproject.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Builder
@Data
@AllArgsConstructor
public class comment {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date comment_time;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "comment_student",referencedColumnName = "studentId")
    private StudentInfo comment_student;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "comment_room",referencedColumnName = "roomId")
    private RoomInfo comment_room;

    @NotNull
    private String comment_content;

    @OneToMany(mappedBy = "reply_comment", cascade = CascadeType.ALL)
    private List<comment_reply> replies = new ArrayList<>();
    public comment() {

    }

    public comment(StudentInfo comment_student, RoomInfo comment_room, String comment_content) {
        this.comment_student = comment_student;
        this.comment_room = comment_room;
        this.comment_content = comment_content;
    }
    @PrePersist
    protected void onCreate() {
        if (comment_time == null) {
            comment_time = new Date();
        }
    }
    public int getId() {
        return id;
    }

    public List<comment_reply> getReplies() {
        return replies;
    }

    public void setReplies(List<comment_reply> replies) {
        this.replies = replies;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getComment_time() {
        return comment_time;
    }

    public void setComment_time(Date comment_time) {
        this.comment_time = comment_time;
    }

    public StudentInfo getComment_student() {
        return comment_student;
    }

    public void setComment_student(StudentInfo comment_student) {
        this.comment_student = comment_student;
    }

    public RoomInfo getComment_room() {
        return comment_room;
    }

    public void setComment_room(RoomInfo comment_roomInfo) {
        this.comment_room = comment_roomInfo;
    }

    public String getComment_content() {
        return comment_content;
    }

    public void setComment_content(String comment_content) {
        this.comment_content = comment_content;
    }
}
