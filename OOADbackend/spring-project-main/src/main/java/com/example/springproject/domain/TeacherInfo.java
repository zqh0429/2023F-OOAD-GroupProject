package com.example.springproject.domain;


import javax.persistence.*;
import java.io.Serializable;

@Entity
public class TeacherInfo implements Serializable {
    @Id
    private String teacherId;

    // other fields specific to Student
    @MapsId
    @OneToOne
    @JoinColumn(name = "teacherId", referencedColumnName = "userId")
    private UserInfo user;

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public UserInfo getUser() {
        return user;
    }

    public void setUser(UserInfo user) {
        this.user = user;
    }
}
