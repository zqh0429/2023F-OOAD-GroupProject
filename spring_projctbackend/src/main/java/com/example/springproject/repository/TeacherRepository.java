package com.example.springproject.repository;

import com.example.springproject.domain.TeacherInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<TeacherInfo,String> {

}
