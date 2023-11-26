package com.example.springproject.service.Teacher.impl;

import com.example.springproject.domain.TeamMember;
import com.example.springproject.dto.student.DormitoryselectedDto;
import com.example.springproject.repository.TeamRepository;
import com.example.springproject.service.Teacher.TeacherService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Slf4j
@Service
public class TeacherServiceImpl implements TeacherService {
    private final TeamRepository teamRepository;

    public TeacherServiceImpl(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
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
}
