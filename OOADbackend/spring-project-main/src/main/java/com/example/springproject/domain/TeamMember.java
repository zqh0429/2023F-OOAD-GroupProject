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
public class TeamMember {

    @Id
    private int teamId;

    public TeamInfo getTeam() {
        return team;
    }

    public void setTeam(TeamInfo team) {
        this.team = team;
    }

    @MapsId
    @OneToOne
    @JoinColumn(name = "teamId", referencedColumnName = "teamId")
    private TeamInfo team;

    public TeamMember(TeamInfo team, UserInfo leader) {
        this.team = team;
        this.member_leader = leader;
    }

    //    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;


    @NotNull
    @OneToOne
    @JoinColumn(name = "lead_id",referencedColumnName = "userId")
    private UserInfo member_leader;


    @OneToOne
    @JoinColumn(name = "mem_one_id",referencedColumnName = "userId")
    private UserInfo member_one;


    @OneToOne
    @JoinColumn(name = "mem_two_id",referencedColumnName = "userId")
    private UserInfo member_two;


    @OneToOne
    @JoinColumn(name = "mem_three_id",referencedColumnName = "userId")
    private UserInfo member_three;


    public TeamMember() {

    }

    public UserInfo getMember_leader() {
        return member_leader;
    }

    public void setMember_leader(UserInfo member_leader) {
        this.member_leader = member_leader;
    }

    public UserInfo getMember_one() {
        return member_one;
    }

    public void setMember_one(UserInfo member_one) {
        this.member_one = member_one;
    }

    public UserInfo getMember_two() {
        return member_two;
    }

    public void setMember_two(UserInfo member_two) {
        this.member_two = member_two;
    }

    public UserInfo getMember_three() {
        return member_three;
    }

    public void setMember_three(UserInfo member_three) {
        this.member_three = member_three;
    }
}