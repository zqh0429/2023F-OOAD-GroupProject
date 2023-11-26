package com.example.springproject.service.Teacher;

import com.example.springproject.domain.RoomInfo;
import com.example.springproject.domain.TeamMember;
import com.example.springproject.dto.Room.RoomForm;

import java.util.List;

public interface TeacherService {
    public boolean setselectetime();
    public List<TeamMember> derive_dormitory_select();

    public RoomInfo uploadroom(RoomForm roomForm);
    public RoomInfo updateroom(int roomid, RoomForm roomForm);
}
