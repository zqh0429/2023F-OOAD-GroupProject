package com.example.springproject.repository;


import com.example.springproject.domain.StudentInfo;
import com.example.springproject.domain.message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<message,Integer> {
    @Query("SELECT c FROM message c WHERE c.recipient.studentId = :studentId")
    List<message> getmessageByuserid(@Param("studentId") String studentId);
}
