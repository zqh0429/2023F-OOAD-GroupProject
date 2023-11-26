package com.example.springproject.service.Teacher.impl;

import com.example.springproject.domain.RoomInfo;
import com.example.springproject.domain.TeamMember;
import com.example.springproject.dto.Room.RoomForm;
import com.example.springproject.repository.RoomRepository;
import com.example.springproject.repository.TeamRepository;
import com.example.springproject.service.Teacher.TeacherService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;


@Slf4j
@Service
public class TeacherServiceImpl implements TeacherService {
    private final TeamRepository teamRepository;
    private final RoomRepository roomRepository;

    public TeacherServiceImpl(TeamRepository teamRepository, RoomRepository roomRepository) {
        this.teamRepository = teamRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    public boolean setselectetime() {
        return false;
    }

    @Override
    public List<TeamMember> derive_dormitory_select() {
        List<TeamMember> list=teamRepository.findAllTeamMembers();

        return list;
    }

    @Override
    public RoomInfo uploadroom(RoomForm roomForm) {
        RoomInfo roomInfo=new RoomInfo(roomForm.getRegion(),roomForm.getFloor(),roomForm.getNumber(),roomForm.getType(),roomForm.getBuilding(),roomForm.getDescription());
        return roomRepository.save(roomInfo);

    }

    @Override
    public RoomInfo updateroom(int roomid, RoomForm roomForm) {
        RoomInfo roomInfo=roomRepository.findAllById(roomid);
        roomInfo.setRoom_region(roomForm.getRegion());
        roomInfo.setRoom_building(roomForm.getBuilding());
        roomInfo.setRoom_description(roomForm.getDescription());
        roomInfo.setRoom_floor(roomForm.getFloor());
        roomInfo.setRoom_type(roomForm.getType());
        roomInfo.setRoom_number(roomForm.getNumber());

        return roomRepository.save(roomInfo);
    }
}
