package com.example.springproject.controller;

import com.example.springproject.domain.RoomInfo;
import com.example.springproject.dto.Room.RoomDto;
import com.example.springproject.dto.user.UserDto;
import com.example.springproject.service.Room.RoomService;
import com.example.springproject.service.Team.TeamService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path = "/room")
public class RoomController {
    private final RoomService roomService;
    private final TeamService teamService;
    public RoomController(RoomService roomService, TeamService teamService) {
        this.roomService = roomService;
        this.teamService = teamService;
    }

    @GetMapping("/region")
    public List<RoomInfo> displayroombyregion(@RequestParam String region){

        return roomService.findroombyRegion(region);
    }

    @GetMapping("/region/building")
    public List<RoomInfo> displayroombybuilding(@RequestParam String region,@RequestParam String building){

        return roomService.findroombyBuilding(region,building);
    }

    @GetMapping("/region/building/floor")
    public List<RoomInfo> displayroombyfloor(@RequestParam String region,@RequestParam String building,@RequestParam int floor){
        System.out.println(floor);
        return roomService.findroombyfloor(region,building,floor);
    }
    @GetMapping("/region/building/floor/number")
    public List<RoomInfo> displayroombynumber(@RequestParam String region,@RequestParam String building,@RequestParam int floor,@RequestParam int number){

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
