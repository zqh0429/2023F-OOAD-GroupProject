package com.example.springproject.repository;

import com.example.springproject.domain.StudentInfo;
import com.example.springproject.domain.TeamMember;
import com.example.springproject.domain.UserInfo;
import io.swagger.models.auth.In;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeamMemberRepository extends JpaRepository<TeamMember, Integer> {
    @Query("SELECT s FROM TeamMember s where :student_id in (s.member_leader.userId, s.member_one.userId, s.member_two.userId, s.member_three.userId)")
    public List<TeamMember> findStudentInTeam(@Param("student_id") String student_id);

    @Query("SELECT s.member_leader.userId FROM TeamMember s where s.team.teamId = :team_id")
    public String findLeaderByTeamId(@Param("team_id") int team_id);

    public TeamMember findTeamMemberByTeamId(int team_id);
    @Query("SELECT s FROM TeamMember s where s.member_one.userId = :student_id")
    public TeamMember findTeamMemberByMember_one(@Param("student_id") String student_id);
    @Query("SELECT s FROM TeamMember s where s.member_two.userId = :student_id")
    public TeamMember findTeamMemberByMember_two(@Param("student_id") String student_id);

    @Query("SELECT s FROM TeamMember s where s.member_three.userId = :student_id")
    public TeamMember findTeamMemberByMember_three(@Param("student_id") String student_id);
}