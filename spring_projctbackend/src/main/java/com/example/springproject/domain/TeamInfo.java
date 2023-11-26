package com.example.springproject.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Builder
@Data
@AllArgsConstructor
public class TeamInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int teamId;

    @NotNull
    private String team_name;
    @NotNull
    private int team_member_number;

    private String team_description;

    public RoomInfo getSelected_room() {
        return selected_room;
    }

    public void setSelected_room(RoomInfo selected_room) {
        this.selected_room = selected_room;
    }

    @OneToOne
    @JoinColumn(name = "selected_room",referencedColumnName = "roomId")
    private RoomInfo selected_room;



    public TeamInfo(String team_name, String team_description, int team_member_number) {
        this.team_name = team_name;
        this.team_description = team_description;
        this.team_member_number = team_member_number;
    }

    public TeamInfo() {

    }

    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int id) {
        this.teamId = id;
    }

    public String getTeam_name() {
        return team_name;
    }

    public void setTeam_name(String team_name) {
        this.team_name = team_name;
    }


    public int getTeam_member_number() {
        return team_member_number;
    }

    public void setTeam_member_number(int team_member_number) {
        this.team_member_number = team_member_number;
    }

    public String getTeam_description() {
        return team_description;
    }

    public void setTeam_description(String team_description) {
        this.team_description = team_description;
    }
}