package com.example.springproject.repository;

import com.example.springproject.domain.StudentInfo;
import com.example.springproject.domain.UserInfo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface StudentRepository extends JpaRepository<StudentInfo, String> {
    @Query("SELECT s FROM StudentInfo s where s.studentId = :userid")
    public StudentInfo findStudentInfoByUserID(@Param("userid") String userid);
    @Query("SELECT s FROM StudentInfo s where s.studentId = :userid")
    public StudentInfo findStudentInfoByStudentId(String userid);

    @Query("SELECT s FROM StudentInfo s where s.studentId = :student_id")
    public List<StudentInfo> findStudentInfoById(@Param("student_id") String student_id);

    public List<StudentInfo> findStudentInfoByGender(String gender);

    @Modifying
    @Transactional
    @Query("UPDATE StudentInfo u set u.gender = :gender, u.degree = :degree, u.major = :major, u.undergraduateSchool = :undergraduateSchool, u.studentDescription = :studentDescription where u.studentId = :studentId")
    void updateStudentInformation(@Param("gender") String gender, @Param("degree") String degree, @Param("major") String major, @Param("undergraduateSchool") String undergraduateSchool, @Param("studentDescription") String studentDescription, @Param("studentId") String studentId);


}
