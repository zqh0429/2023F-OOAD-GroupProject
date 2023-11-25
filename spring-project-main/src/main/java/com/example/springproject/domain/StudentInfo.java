package com.example.springproject.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class StudentInfo implements Serializable {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long id;

    @Embeddable
    public static class StudentId implements Serializable {

        public UserInfo getUserInfo() {
            return userInfo;
        }

        public void setUserInfo(UserInfo userInfo) {
            this.userInfo = userInfo;
        }

        @OneToOne
        @JoinColumn(name = "studentId",referencedColumnName = "userId")
        private UserInfo userInfo;

        public StudentId(UserInfo userInfo) {
            this.userInfo = userInfo;
        }

        public StudentId() {

        }
    }

    public StudentId getStudentId() {
        return studentId;
    }

    public void setStudentId(StudentId studentId) {
        this.studentId = studentId;
    }

    @EmbeddedId
    private StudentId studentId;


    public StudentInfo() {

    }

//    public UserInfo getUserInfo() {
//        return userInfo;
//    }
//
//    public void setUserInfo(UserInfo userInfo) {
//        this.userInfo = userInfo;
//    }


//    @OneToOne
//    @JoinColumn(name = "studentId")
//    private UserInfo userInfo;

    private String gender;
    private String degree;
    private String major;
    private String undergraduateSchool;
    @Lob // 使用 @Lob 注解表示这个字段是一个大对象，适用于 text 类型
    @Column(name = "studentDescription", columnDefinition = "text")
    private String studentDescription;

    public StudentInfo(UserInfo userInfo, String gender, String degree, String major, String undergraduateSchool, String studentDescription) {
        this.studentId = new StudentId(userInfo);
        this.gender = gender;
        this.degree = degree;
        this.major = major;
        this.undergraduateSchool = undergraduateSchool;
        this.studentDescription = studentDescription;
    }


    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getUndergraduateSchool() {
        return undergraduateSchool;
    }

    public void setUndergraduateSchool(String undergraduate_school) {
        this.undergraduateSchool = undergraduate_school;
    }

    public String getStudentDescription() {
        return studentDescription;
    }

    public void setStudentDescription(String student_description) {
        this.studentDescription = student_description;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }


}
