package com.example.springproject.service.Room;

import com.example.springproject.domain.RoomInfo;
import com.example.springproject.dto.Room.RoomDto;

import java.util.List;

public interface RoomService {
    public List<String> findroombyRegion(String region);
    public List<Integer> findroombyBuilding(String region,String building);
    public List<Integer> findroombyfloor(String region,String building,int floor);

    public RoomInfo findroombynumber(String region,String building,int floor,int number);
    public RoomDto starRoom(RoomDto roomDto);
    public boolean studentInTeam(String student_id);
    public boolean roomBeStarred(int team_id, int room_id);
    public RoomDto disstarRoom(RoomDto roomDto);
}
