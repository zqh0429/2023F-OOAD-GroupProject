package com.example.springproject.repository;

import com.example.springproject.domain.TeamStar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeamStarRepository extends JpaRepository<TeamStar, Object> {
    @Query("SELECT s FROM TeamStar s where s.team_star_id.team.teamId = :team_id and s.team_star_id.room.roomId = :room_id")
    public List<TeamStar> findTeamStarByTeamIdAndStudentId(@Param("team_id")int team_id, @Param("room_id")int room_id);
}