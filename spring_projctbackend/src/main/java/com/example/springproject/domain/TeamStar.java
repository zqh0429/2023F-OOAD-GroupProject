package com.example.springproject.domain;


import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity

@Data
public class TeamStar {

    public TeamStar() {

    }

    @Embeddable
    public static class TeamStarId implements Serializable {
        public TeamStarId(TeamInfo team, RoomInfo room) {
            this.team = team;
            this.room = room;
        }

        @ManyToOne
        @JoinColumn(name = "teamId",referencedColumnName = "teamId")
        private TeamInfo team;

        @ManyToOne
        @JoinColumn(name = "roomId",referencedColumnName = "roomId")
        private RoomInfo room;

        public TeamStarId() {

        }

        // constructors, equals, and hashCode methods...


        public TeamInfo getTeam() {
            return team;
        }

        public void setTeam(TeamInfo team) {
            this.team = team;
        }

        public RoomInfo getRoom() {
            return room;
        }

        public void setRoom(RoomInfo room) {
            this.room = room;
        }
    }

    public TeamStar (TeamInfo team, RoomInfo room) {
        this.team_star_id = new TeamStarId(team, room);
    }

    @Id
    @EmbeddedId
    private TeamStarId team_star_id;

    public TeamStarId getTeam_star_id() {
        return team_star_id;
    }

    public void setTeam_star_id(TeamStarId id) {
        this.team_star_id = id;
    }
}