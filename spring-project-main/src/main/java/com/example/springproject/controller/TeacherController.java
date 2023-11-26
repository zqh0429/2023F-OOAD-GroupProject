package com.example.springproject.controller;


import com.example.springproject.domain.RoomInfo;
import com.example.springproject.domain.TeamMember;
import com.example.springproject.dto.Room.RoomForm;
import com.example.springproject.service.Teacher.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/teacher")
public class TeacherController {
    private final TeacherService teacherService;

    @Autowired
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    //导出宿舍选择情况
    @GetMapping("/getdorsele")
    public List<TeamMember> getdorselect(){
        return teacherService.derive_dormitory_select();
    }

    @PostMapping("/uploadroom")
    public RoomInfo uploadroom(@RequestBody RoomForm roomForm){

        return teacherService.uploadroom(roomForm);
    }

    @PostMapping("/updateroom")
    public RoomInfo updateroom(@RequestParam int roomId,@RequestBody RoomForm roomForm){

        return teacherService.updateroom(roomId,roomForm);
    }
}
