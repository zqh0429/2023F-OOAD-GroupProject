package com.example.springproject.service.Team;

import com.example.springproject.domain.TeamInfo;
import com.example.springproject.domain.TeamMember;
import com.example.springproject.domain.UserInfo;
import com.example.springproject.dto.team.TeamCreationForm;
import com.example.springproject.dto.team.TeamDto;
import com.example.springproject.dto.team.TeamInformationForm;
import com.example.springproject.dto.user.UserDto;
import org.springframework.validation.BindingResult;

public interface TeamService {
    public boolean selectroom(int roomid, UserDto userDto);

    public TeamDto createTeam(TeamCreationForm teamCreationForm, BindingResult result);
    public boolean studentInTeam(String student_id);
    public UserInfo findUserByUserId(String userId);
    public TeamInformationForm showMyTeam(TeamDto teamDto);
    public TeamDto modifyTeamInformation(TeamCreationForm teamCreationForm, BindingResult result);
    public TeamInformationForm convertTeamToInformationForm(TeamInfo teamInfo, TeamMember teamMember);
    public TeamDto joinTeam(TeamDto teamDto);
    public TeamDto exitTeam(TeamDto teamDto);
    public TeamDto disbandTeam(TeamDto teamDto);
}
