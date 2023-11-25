package com.example.springproject.repository;

import com.example.springproject.domain.StudentInfo;
import com.example.springproject.domain.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentRepository extends JpaRepository<StudentInfo, Integer> {
    @Query("SELECT s FROM StudentInfo s where s.studentId.userInfo.userId = ?1")
    public List<StudentInfo> findStudentInfoByUserID( String id);

}
