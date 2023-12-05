package com.example.springproject.service.Team.impl;

import com.example.springproject.config.MyException;
import com.example.springproject.domain.*;
import com.example.springproject.dto.team.TeamCreationForm;
import com.example.springproject.dto.team.TeamDto;
import com.example.springproject.dto.team.TeamInformationForm;
import com.example.springproject.dto.user.UserDto;
import com.example.springproject.repository.*;
import com.example.springproject.service.Team.TeamService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import com.example.springproject.domain.TeamInfo;

import java.util.List;


@Slf4j
@Service
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepository;
    private final RoomRepository roomRepository;

    private final TeamMemberRepository teamMemberRepository;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;

    public TeamServiceImpl(TeamRepository teamRepository, RoomRepository roomRepository, TeamMemberRepository teamMemberRepository, UserRepository userRepository, StudentRepository studentRepository) {
        this.teamRepository = teamRepository;
        this.roomRepository = roomRepository;
        this.teamMemberRepository = teamMemberRepository;
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public boolean selectroom(int roomid, String userId) {

        int teamid=teamRepository.findteamIdsByleader(userId);
        System.out.println(teamid);
        TeamInfo team = teamRepository.findById(teamid);
        RoomInfo selectedRoom = roomRepository.findAllById(roomid);
        if (selectedRoom.isSelected()){
            throw new MyException(7, "The room has been selected. Please select another one.");
        }else {
            if (team.getSelected_room() != null) {
                team.getSelected_room().setSelected(false);
            }
            team.setSelected_room(selectedRoom);
            selectedRoom.setSelected(true);
            teamRepository.save(team);
            roomRepository.save(selectedRoom);
            return true;
        }

    }

    @Override
    public TeamDto createTeam(TeamCreationForm teamCreationForm, BindingResult result) {
        if (result.hasErrors()) {
            List<FieldError> errors = result.getFieldErrors();
            throw new MyException(8, errors.get(0).getDefaultMessage());
        } else if (!studentInTeam(teamCreationForm.getCreatorId())) {
            throw new MyException(9, "You have joined a team!");
        } else {
            TeamInfo team = new TeamInfo(teamCreationForm.getTeam_name(), teamCreationForm.getTeam_description(), 1);
            TeamInfo new_team = teamRepository.save(team);
            UserInfo creator = findUserByUserId(teamCreationForm.getCreatorId());
            TeamMember teamMember = new TeamMember(new_team, creator);
            teamMemberRepository.save(teamMember);
            return TeamDto.builder()
                    .teamId(new_team.getTeamId())
                    .studentId(teamCreationForm.getCreatorId())
                    .build();
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
    public UserInfo findUserByUserId(String userId) {
        return userRepository.findUserByUserId(userId);
    }

    @Override
    public TeamInformationForm showMyTeam(TeamDto teamDto) {
        if (studentInTeam(teamDto.getStudentId())) {
            throw new MyException(10, "You are not in any teams!");
        } else {
            TeamMember teamMember = teamMemberRepository.findStudentInTeam(teamDto.getStudentId()).get(0);
            TeamInfo teamInfo = teamMember.getTeam();
            return convertTeamToInformationForm(teamInfo, teamMember);
        }
    }

    @Override
    public TeamDto modifyTeamInformation(TeamCreationForm teamCreationForm, BindingResult result) {
        if (result.hasErrors()) {
            List<FieldError> errors = result.getFieldErrors();
            throw new MyException(8, errors.get(0).getDefaultMessage());
        } else {
            TeamMember teamMember = teamMemberRepository.findStudentInTeam(teamCreationForm.getCreatorId()).get(0);
            TeamInfo teamInfo = teamMember.getTeam();
            teamInfo.setTeam_name(teamCreationForm.getTeam_name());
            teamInfo.setTeam_description(teamCreationForm.getTeam_description());
            teamRepository.save(teamInfo);
            return TeamDto.builder()
                    .teamId(teamInfo.getTeamId())
                    .studentId(teamCreationForm.getCreatorId())
                    .build();
        }
    }

    @Override
    public TeamInformationForm convertTeamToInformationForm(TeamInfo teamInfo, TeamMember teamMember) {
        return TeamInformationForm.builder()
                .team_id(teamInfo.getTeamId())
                .team_name(teamInfo.getTeam_name())
                .team_member_number(teamInfo.getTeam_member_number())
                .team_description(teamInfo.getTeam_description())
                .selected_room_id(teamInfo.getSelected_room() != null ? teamInfo.getSelected_room().getRoomId() : null)
                .leader_id(teamMember.getMember_leader() != null ? teamMember.getMember_leader().getUserId() : null)
                .first_member_id(teamMember.getMember_one() != null ? teamMember.getMember_one().getUserId() : null)
                .second_member_id(teamMember.getMember_two() != null ? teamMember.getMember_two().getUserId() : null)
                .third_member_id(teamMember.getMember_three() != null ? teamMember.getMember_three().getUserId() : null)
                .build();
    }

    @Override
    public TeamDto joinTeam(TeamDto teamDto) {
        TeamInfo team = teamRepository.findTeamInfoByTeamId(teamDto.getTeamId());
        if (team == null) {
            throw new MyException(16, "The team_id is wrong!");
        }
        int number = team.getTeam_member_number();
        if (number == 4) {
            throw new MyException(11, "The team is full!");
        } else {
            StudentInfo student = studentRepository.findStudentInfoById(teamDto.getStudentId()).get(0);
            String leader_id = teamMemberRepository.findLeaderByTeamId(teamDto.getTeamId());
            StudentInfo leader = studentRepository.findStudentInfoById(leader_id).get(0);
            if (!student.getGender().equals(leader.getGender())) {
                throw new MyException(12, "You can't join a team of the opposite sex!");
            } else if (!student.getDegree().equals(leader.getDegree())) {
                throw new MyException(13, "You doesn't match the degree of the team!");
            } else {
                TeamMember teamMember = teamMemberRepository.findTeamMemberByTeamId(team.getTeamId());
                if (number == 1) {
                    teamMember.setMember_one(student.getUserInfo());
                } else if (number == 2) {
                    teamMember.setMember_two(student.getUserInfo());
                } else if (number == 3) {
                    teamMember.setMember_three(student.getUserInfo());
                }
                team.setTeam_member_number(number + 1);
                teamRepository.save(team);
                teamMemberRepository.save(teamMember);
                return teamDto;
            }
        }
    }

    @Override
    public TeamDto exitTeam(TeamDto teamDto) {
        TeamInfo team = teamRepository.findTeamInfoByTeamId(teamDto.getTeamId());
        if (team == null) {
            throw new MyException(16, "The team_id is wrong!");
        }
        UserInfo userInfo = findUserByUserId(teamDto.getStudentId());
        if (teamDto.getStudentId().equals(teamMemberRepository.findLeaderByTeamId(teamDto.getTeamId()))) {
            throw new MyException(14, "The leader can't exit the team!");
        } else {
            TeamMember teamMember = teamMemberRepository.findTeamMemberByTeamId(teamDto.getTeamId());
            int number = team.getTeam_member_number();
            if (teamMemberRepository.findTeamMemberByMember_three(teamDto.getStudentId()) != null) {
                teamMember.setMember_three(null);
            } else if (teamMemberRepository.findTeamMemberByMember_two(teamDto.getStudentId()) != null) {
                teamMember.setMember_two(null);
                if (number == 4) {
                    teamMember.setMember_two(teamMember.getMember_three());
                    teamMember.setMember_three(null);
                }
            } else if (teamMemberRepository.findTeamMemberByMember_one(teamDto.getStudentId()) != null) {
                teamMember.setMember_one(null);
                if (number == 4) {
                    teamMember.setMember_one(teamMember.getMember_two());
                    teamMember.setMember_two(teamMember.getMember_three());
                    teamMember.setMember_three(null);
                } else if (number == 3) {
                    teamMember.setMember_one(teamMember.getMember_two());
                    teamMember.setMember_two(null);
                }
            } else {
                throw new MyException(15, "You aren't in the team!");
            }
            team.setTeam_member_number(number - 1);
            teamMemberRepository.save(teamMember);
            teamRepository.save(team);
            return teamDto;
        }

    }

    @Override
    public TeamDto disbandTeam(TeamDto teamDto) {
        TeamInfo team = teamRepository.findTeamInfoByTeamId(teamDto.getTeamId());
        if (team == null) {
            throw new MyException(16, "The team_id is wrong!");
        }
        int number = team.getTeam_member_number();
        TeamMember teamMember = teamMemberRepository.findTeamMemberByTeamId(teamDto.getTeamId());
        if (!teamMember.getMember_leader().getUserId().equals(teamDto.getStudentId())) {
            throw new MyException(17, "Your are not the leader of the team!");
        } else if (number != 1) {
            throw new MyException(18, "The team still has team members!");
        } else {
            teamMemberRepository.deleteById(teamDto.getTeamId());
            teamRepository.deleteById(teamDto.getTeamId());
            return teamDto;
        }
    }
}
