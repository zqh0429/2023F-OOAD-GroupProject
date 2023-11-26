package com.example.springproject.repository;
import com.example.springproject.domain.TeamMember;
import com.example.springproject.domain.TeamInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TeamRepository extends JpaRepository<TeamInfo,Integer> {
    @Query("SELECT r FROM TeamInfo r WHERE r.teamId = :teamid")
    public TeamInfo findById(@Param("teamid") int teamid);
    TeamInfo findTeamInfoByTeamId(int team_id);
    @Query("SELECT r.teamId FROM TeamMember r WHERE r.member_leader.userId = :lead_id")
   public int findteamIdsByleader(@Param("lead_id") String lead_id);

//    @Modifying
//    @Transactional
//    @Query("UPDATE TeamInfo u SET u.selected = :status WHERE u.id = :roomId")
//    public boolean updateRoomInfoById(@Param("roomId") int roomId, @Param("status") boolean status);
//
    @Query("SELECT tm FROM TeamMember tm")
    List<TeamMember> findAllTeamMembers();

    @Query("SELECT r.selected_room.roomId FROM TeamInfo r WHERE r.teamId = :team_id")
    public Integer findselectedroomIdsByteamid(@Param("team_id") int team_id);


}
