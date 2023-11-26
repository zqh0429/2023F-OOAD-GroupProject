package com.example.springproject.controller;

import com.example.springproject.domain.comment_reply;
import com.example.springproject.dto.team.TeamCreationForm;
import com.example.springproject.dto.team.TeamDto;
import com.example.springproject.dto.team.TeamInformationForm;
import com.example.springproject.dto.user.UserDto;
import com.example.springproject.service.Team.TeamService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/team")
public class TeamController {
private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }




    /**
     * 创建队伍
     */
    @PostMapping("/create")
    public TeamDto TeamCreate(@RequestBody @Valid TeamCreationForm teamCreationForm, BindingResult bindingResult) {
        return teamService.createTeam(teamCreationForm, bindingResult);
    }

    /**
     * 展示用户所在队伍
     */
    @GetMapping("/showMyTeam")
    public TeamInformationForm ShowMyTeam(@RequestBody TeamDto teamDto) {
        return teamService.showMyTeam(teamDto);
    }

    /**
     * 修改队伍信息
     */
    @PostMapping("/showMyTeam/modifyInformation")
    public TeamDto UpdateTeamInformation(@RequestBody @Valid TeamCreationForm teamCreationForm, BindingResult bindingResult) {
        return teamService.modifyTeamInformation(teamCreationForm, bindingResult);
    }

    /**
     * 加入队伍
     */
    @PostMapping("/join")
    public TeamDto JoinTeam(@RequestBody TeamDto teamDto) {
        return teamService.joinTeam(teamDto);
    }

    /**
     * 退出队伍
     */
    @PostMapping("/exit")
    public TeamDto ExitTeam(@RequestBody TeamDto teamDto) {
        return teamService.exitTeam(teamDto);
    }

    /**
     * 解散队伍
     */
    @PostMapping("/disband")
    public TeamDto DisbandTeam(@RequestBody TeamDto teamDto) {
        return teamService.disbandTeam(teamDto);
    }

}
