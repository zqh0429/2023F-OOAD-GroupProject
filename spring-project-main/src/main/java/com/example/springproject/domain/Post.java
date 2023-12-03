package com.example.springproject.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Builder
@Data
@AllArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int post_id;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date post_time;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalTime sleep_time;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalTime wake_time;
    @NotNull
    private String post_content;

    @NotNull
    private String title;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "post_User",referencedColumnName = "studentId")
    private StudentInfo post_User;

    public Post() {

    }

    public Post(LocalTime sleep_time, LocalTime wake_time, String post_content, String title, StudentInfo post_User) {
        this.sleep_time = sleep_time;
        this.wake_time = wake_time;
        this.post_content = post_content;
        this.title = title;
        this.post_User = post_User;
    }

    protected void onCreate() {
        if (post_time == null) {
            post_time = new Date();
        }
    }

    public LocalTime getSleep_time() {
        return sleep_time;
    }

    public void setSleep_time(LocalTime sleep_time) {
        this.sleep_time = sleep_time;
    }

    public LocalTime getWake_time() {
        return wake_time;
    }

    public void setWake_time(LocalTime wake_time) {
        this.wake_time = wake_time;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getPost_id() {
        return post_id;
    }

    public void setPost_id(int id) {
        this.post_id = id;
    }

    public StudentInfo getPost_User() {
        return post_User;
    }

    public void setPost_User(StudentInfo post_User) {
        this.post_User = post_User;
    }

    public Date getPost_time() {
        return post_time;
    }

    public void setPost_time(Date post_time) {
        this.post_time = post_time;
    }

    public String getPost_content() {
        return post_content;
    }

    public void setPost_content(String post_content) {
        this.post_content = post_content;
    }
}
