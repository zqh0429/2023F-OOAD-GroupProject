package com.example.springproject.domain;

import com.example.springproject.dto.student.StudentDto;
import com.example.springproject.dto.student.StudentInformationForm;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Entity
public class StudentInfo implements Serializable {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long id;

//    @Embeddable
//    public static class StudentId implements Serializable {
//
//        public UserInfo getUserInfo() {
//            return userInfo;
//        }
//
//        public void setUserInfo(UserInfo userInfo) {
//            this.userInfo = userInfo;
//        }
//
//        @OneToOne
//        @JoinColumn(name = "studentId",referencedColumnName = "userId")
//        private UserInfo userInfo;
//
//        public StudentId(UserInfo userInfo) {
//            this.userInfo = userInfo;
//        }
//
//        public StudentId() {
//
//        }
//    }

//    public StudentId getStudentId() {
//        return studentId;
//    }
//
//    public void setStudentId(StudentId studentId) {
//        this.studentId = studentId;
//    }
//
//    @EmbeddedId
//    private StudentId studentId;


    @Id
    private String studentId;

    // other fields specific to Student
    @MapsId
    @OneToOne
    @JoinColumn(name = "studentId", referencedColumnName = "userId")
    private UserInfo userInfo;

    public StudentInfo() {

    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo user) {
        this.userInfo = user;
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

    private String studentDescription;

    public String getHomeTown() {
        return homeTown;
    }

    public void setHomeTown(String homeTown) {
        this.homeTown = homeTown;
    }

    private String homeTown;

    private LocalTime sleepTime;

    private LocalTime wakeTime;

    public String getCircleUrl() {
        return circleUrl;
    }

    public void setCircleUrl(String circleUrl) {
        this.circleUrl = circleUrl;
    }

    private String circleUrl;

    public StudentInfo(UserInfo userInfo, String gender, String degree, String major, String undergraduateSchool, String studentDescription, String homeTown, String sleepTime, String wakeTime, String circleUrl) {
        this.userInfo = userInfo;
        this.gender = gender;
        this.degree = degree;
        this.major = major;
        this.undergraduateSchool = undergraduateSchool;
        this.studentDescription = studentDescription;
        this.homeTown = homeTown;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        this.sleepTime = LocalTime.parse(sleepTime, formatter);
        this.wakeTime = LocalTime.parse(wakeTime, formatter);
        this.circleUrl = circleUrl;
    }

    public StudentInfo(String studentId, String gender, String degree, String major, String undergraduateSchool, String studentDescription, String homeTown, String sleepTime, String wakeTime, String circleUrl) {
        this.studentId = studentId;
        this.gender = gender;
        this.degree = degree;
        this.major = major;
        this.undergraduateSchool = undergraduateSchool;
        this.studentDescription = studentDescription;
        this.homeTown = homeTown;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        this.sleepTime = LocalTime.parse(sleepTime, formatter);
        this.wakeTime = LocalTime.parse(wakeTime, formatter);
        this.circleUrl = circleUrl;
    }

    public LocalTime getSleepTime() {
        return sleepTime;
    }

    public void setSleepTime(LocalTime sleep_time) {
        this.sleepTime = sleep_time;
    }

    public LocalTime getWakeTime() {
        return wakeTime;
    }

    public void setWakeTime(LocalTime wake_time) {
        this.wakeTime = wake_time;
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

    public StudentInformationForm convertToStudentInformationForm() {
        return StudentInformationForm.builder()
                .studentId(getUserInfo().getUserId())
                .studentName(getUserInfo().getUsername())
                .gender(getGender())
                .degree(getDegree())
                .major(getMajor())
                .undergraduateSchool(getUndergraduateSchool())
                .studentDescription(getStudentDescription())
                .sleepTime(getSleepTime().toString())
                .wakeTime(getWakeTime().toString())
                .homeTown(getHomeTown().toString())
                .circleUrl(getCircleUrl())
                .build();
    }

    public StudentDto convertToStudentDto() {
        return StudentDto.builder()
                .studentId(getUserInfo().getUserId())
                .studentGender(getGender())
                .build();
    }
}