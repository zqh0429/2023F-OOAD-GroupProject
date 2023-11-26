package com.example.springproject.service.Teacher;

import com.example.springproject.domain.TeamMember;
import com.example.springproject.dto.student.DormitoryselectedDto;
import springfox.documentation.spring.web.json.Json;

import java.util.List;

public interface TeacherService {
    public boolean setselectetime();
    public List<TeamMember> derive_dormitory_select();
}
