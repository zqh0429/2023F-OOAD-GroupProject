package com.example.springproject.service.Room;

import com.example.springproject.domain.RoomInfo;
import com.example.springproject.dto.Room.RoomDto;

import java.util.List;

public interface RoomService {
    public List<RoomInfo> findroombyRegion(String region);
    public List<RoomInfo> findroombyBuilding(String region,String building);
    public List<RoomInfo> findroombyfloor(String region,String building,int floor);

    public List<RoomInfo> findroombynumber(String region,String building,int floor,int number);
    public RoomDto starRoom(RoomDto roomDto);
    public boolean studentInTeam(String student_id);
    public boolean roomBeStarred(int team_id, int room_id);
    public RoomDto disstarRoom(RoomDto roomDto);
}
