package com.example.springproject.service.Teacher;

import com.example.springproject.domain.RoomInfo;
import com.example.springproject.domain.TeamMember;
import com.example.springproject.dto.Room.RoomForm;
import com.example.springproject.dto.teacher.StudentAccountRegisterForm;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface TeacherService {
    public boolean setselectetime();
    public List<TeamMember> derive_dormitory_select();

    public RoomInfo uploadroom(RoomForm roomForm);
    public RoomInfo updateroom(int roomid, RoomForm roomForm);

    public StudentAccountRegisterForm addStudentAccount(StudentAccountRegisterForm studentAccountRegisterForm, BindingResult result);
    public StudentAccountRegisterForm modifyStudentAccount(StudentAccountRegisterForm studentAccountRegisterForm, BindingResult result);
    public StudentAccountRegisterForm deleteStudentAccount(StudentAccountRegisterForm studentAccountRegisterForm);
}
