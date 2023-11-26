package com.example.springproject.service.Teacher.impl;

import com.example.springproject.config.MyException;
import com.example.springproject.domain.RoomInfo;
import com.example.springproject.domain.TeamMember;
import com.example.springproject.domain.UserInfo;
import com.example.springproject.dto.Room.RoomForm;
import com.example.springproject.dto.teacher.StudentAccountRegisterForm;
import com.example.springproject.repository.*;
import com.example.springproject.service.Teacher.TeacherService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.List;


@Slf4j
@Service
public class TeacherServiceImpl implements TeacherService {
    private final TeamRepository teamRepository;
    private final RoomRepository roomRepository;


    private final TeamMemberRepository teamMemberRepository;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;

    private final TeamStarRepository teamStarRepository;
    private final TeacherRepository teacherRepository;

    public TeacherServiceImpl(TeamRepository teamRepository, RoomRepository roomRepository, TeamMemberRepository teamMemberRepository, UserRepository userRepository, StudentRepository studentRepository, TeamStarRepository teamStarRepository, TeacherRepository teacherRepository) {
        this.teamRepository = teamRepository;
        this.roomRepository = roomRepository;
        this.teamMemberRepository = teamMemberRepository;
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.teamStarRepository = teamStarRepository;
        this.teacherRepository = teacherRepository;
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
        if (roomInfo==null){
            throw new MyException(20, "room does not exist");
        }
        roomInfo.setRoom_region(roomForm.getRegion());
        roomInfo.setRoom_building(roomForm.getBuilding());
        roomInfo.setRoom_description(roomForm.getDescription());
        roomInfo.setRoom_floor(roomForm.getFloor());
        roomInfo.setRoom_type(roomForm.getType());
        roomInfo.setRoom_number(roomForm.getNumber());

        return roomRepository.save(roomInfo);
    }

    @Override
    public StudentAccountRegisterForm addStudentAccount(StudentAccountRegisterForm studentAccountRegisterForm, BindingResult result) {
        if (result.hasErrors()) {
            List<FieldError> errors = result.getFieldErrors();
            throw new MyException(22, errors.get(0).getDefaultMessage());
        } else {
            if (userRepository.findUserByUserId(studentAccountRegisterForm.getStudentId()) != null) {
                throw new MyException(23, "The student account have been created!");
            } else {
                UserInfo user = new UserInfo(studentAccountRegisterForm.getStudentId(), studentAccountRegisterForm.getStudentName(), studentAccountRegisterForm.getStudentId(), 1);
                userRepository.save(user);
                return studentAccountRegisterForm;
            }
        }
    }

    @Override
    public StudentAccountRegisterForm modifyStudentAccount(StudentAccountRegisterForm studentAccountRegisterForm, BindingResult result) {
        if (result.hasErrors()) {
            List<FieldError> errors = result.getFieldErrors();
            throw new MyException(22, errors.get(0).getDefaultMessage());
        } else {
            if (userRepository.findUserByUserId(studentAccountRegisterForm.getStudentId()) == null) {
                throw new MyException(24, "The student account doesn't exist!");
            } else {
                UserInfo user = userRepository.findUserByUserId(studentAccountRegisterForm.getStudentId());
                user.setUsername(studentAccountRegisterForm.getStudentName());
                user.setPassword(studentAccountRegisterForm.getPassword());
                userRepository.save(user);
                return studentAccountRegisterForm;
            }
        }
    }

    @Override
    public StudentAccountRegisterForm deleteStudentAccount(StudentAccountRegisterForm studentAccountRegisterForm) {
        if (userRepository.findUserByUserId(studentAccountRegisterForm.getStudentId()) == null) {
            throw new MyException(24, "The student account doesn't exist!");
        } else {
            userRepository.deleteUserInfoByUserId(studentAccountRegisterForm.getStudentId());
            return studentAccountRegisterForm;
        }
    }
}
