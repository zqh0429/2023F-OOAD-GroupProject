package com.example.springproject.service.Room.impl;


import com.example.springproject.config.MyException;
import com.example.springproject.domain.RoomInfo;
import com.example.springproject.domain.TeamInfo;
import com.example.springproject.domain.TeamMember;
import com.example.springproject.domain.TeamStar;
import com.example.springproject.dto.Room.RoomDto;
import com.example.springproject.repository.*;
import com.example.springproject.service.Room.RoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class RoomServiceimpl implements RoomService {
    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final RoomRepository roomRepository;
    private final TeamStarRepository teamStarRepository;

    public RoomServiceimpl(TeamRepository teamRepository, TeamMemberRepository teamMemberRepository, UserRepository userRepository, StudentRepository studentRepository, RoomRepository roomRepository, TeamStarRepository teamStarRepository) {
        this.teamRepository = teamRepository;
        this.teamMemberRepository = teamMemberRepository;
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.roomRepository = roomRepository;
        this.teamStarRepository = teamStarRepository;
    }
    public List<String> findroombyRegion(String region){
        return roomRepository.findRoomsByRegion(region);
    };

    public List<Integer> findroombyBuilding(String region,String building){
        return roomRepository.findRoomsBybuilding(region,building);
    }

    @Override
    public List<Integer> findroombyfloor(String region, String building, int floor) {
        return roomRepository.findRoomsByfloor(region,building,floor);
    }

    @Override
    public RoomInfo findroombynumber(String region, String building, int floor, int number) {
        return roomRepository.findRoomsBynumber(region,building,floor,number);
    }

    @Override
    public RoomDto starRoom(RoomDto roomDto) {
        if (studentInTeam(roomDto.getStudentId())) {
            throw new MyException(10, "You are not in any teams!");
        } else if (roomRepository.findRoomInfoByRoomId(roomDto.getRoomId()) == null) {
            throw new MyException(19, "The room_id is wrong!");
        } else {
            TeamMember teamMember = teamMemberRepository.findStudentInTeam(roomDto.getStudentId()).get(0);
            TeamInfo team = teamMember.getTeam();
            RoomInfo room = roomRepository.findRoomInfoByRoomId(roomDto.getRoomId());
            if (!roomBeStarred(team.getTeamId(), roomDto.getRoomId())) {
                throw new MyException(20, "The room have been starred by your team!");
            } else {
                TeamStar teamStar = new TeamStar(team, room);
                int room_star = room.getRoom_star();
                room.setRoom_star(room_star + 1);
                teamStarRepository.save(teamStar);
                roomRepository.save(room);
                return roomDto;
            }
        }
    }

    @Override
    public boolean studentInTeam(String student_id) {
        List<TeamMember> teamMembers = teamMemberRepository.findStudentInTeam(student_id);
        if (teamMembers.isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean roomBeStarred(int team_id, int room_id) {
        return teamStarRepository.findTeamStarByTeamIdAndStudentId(team_id, room_id).isEmpty();
    }

    @Override
    public RoomDto disstarRoom(RoomDto roomDto) {
        if (studentInTeam(roomDto.getStudentId())) {
            throw new MyException(10, "You are not in any teams!");
        } else if (roomRepository.findRoomInfoByRoomId(roomDto.getRoomId()) == null) {
            throw new MyException(19, "The room_id is wrong!");
        } else {
            TeamMember teamMember = teamMemberRepository.findStudentInTeam(roomDto.getStudentId()).get(0);
            TeamInfo team = teamMember.getTeam();
            RoomInfo room = roomRepository.findRoomInfoByRoomId(roomDto.getRoomId());
            if (roomBeStarred(team.getTeamId(), roomDto.getRoomId())) {
                throw new MyException(21, "The room haven't been starred by your team!");
            } else {
                TeamStar teamStar = new TeamStar(team, room);
                int room_star = room.getRoom_star();
                room.setRoom_star(room_star - 1);
                teamStarRepository.delete(teamStar);
                roomRepository.save(room);
                return roomDto;
            }
        }
    }
}
