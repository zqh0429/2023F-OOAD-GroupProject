package com.example.springproject.controller;

import com.example.springproject.domain.RoomInfo;
import com.example.springproject.dto.Room.RoomDto;
import com.example.springproject.dto.user.UserDto;
import com.example.springproject.service.Room.RoomService;
import com.example.springproject.service.Team.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(path = "/api/main/")
public class RoomController {
    private final RoomService roomService;
    private final TeamService teamService;

    @Autowired
    public RoomController(RoomService roomService, TeamService teamService) {
        this.roomService = roomService;
        this.teamService = teamService;
    }

    @GetMapping("/selectRoom/{area}")
    public List<String> displayroombyregion(@RequestParam String area){

        return roomService.findroombyRegion(area);
    }

    @GetMapping("/selectRoom/{area,building}")
    public List<Integer> displayroombybuilding(@RequestParam String region, @RequestParam String building){

        return roomService.findroombyBuilding(region,building);
    }

    @GetMapping("/selectRoom/{area,building,floor}")
    public List<Integer> displayroombyfloor(@RequestParam String region,@RequestParam String building,@RequestParam int floor){
        System.out.println(floor);
        return roomService.findroombyfloor(region,building,floor);
    }
    @GetMapping("/selectRoom/{area,building,floor,number}")
    public RoomInfo displayroombynumber(@RequestParam String region,@RequestParam String building,@RequestParam int floor,@RequestParam int number){

        return roomService.findroombynumber(region,building,floor,number);
    }
    @PostMapping("/star")
    public RoomDto StarRoom(@RequestBody RoomDto roomDto) {
        return roomService.starRoom(roomDto);
    }

    /**
     * 队伍取消收藏房间
     */
    @PostMapping("/disstar")
    public RoomDto DisstarRoom(@RequestBody RoomDto roomDto) {
        return roomService.disstarRoom(roomDto);
    }


    //队伍选择宿舍功能？？？规定时间？
    @PostMapping("/select-room")
    public boolean selectteam(@RequestBody UserDto userDto, @RequestParam int roomId) {
        System.out.println(roomId);
        System.out.println(userDto);
        return teamService.selectroom(roomId,userDto);
    }

}
