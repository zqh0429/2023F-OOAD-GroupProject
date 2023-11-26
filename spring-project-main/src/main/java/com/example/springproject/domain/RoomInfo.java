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
public class RoomInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int room_id;

    @NotNull
    private String room_region;
    private int room_floor;
    private int room_number;
    private String room_type;
    private int room_star;
    private String room_building;
    private boolean selected;

    @NotNull
    private String room_description;

    public RoomInfo(String room_region, int room_floor, int room_number, String room_type, String room_building, String room_description) {
        this.room_region = room_region;
        this.room_floor = room_floor;
        this.room_number = room_number;
        this.room_type = room_type;
        this.room_building = room_building;
        this.room_description = room_description;
    }

    public RoomInfo() {

    }

    public boolean isSelected() {
        return selected;
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
    }

    public int getRoom_id() {
        return room_id;
    }

    public void setRoom_id(int id) {
        this.room_id = id;
    }

    public String getRoom_region() {
        return room_region;
    }

    public void setRoom_region(String room_region) {
        this.room_region = room_region;
    }

    public int getRoom_floor() {
        return room_floor;
    }

    public void setRoom_floor(int room_floor) {
        this.room_floor = room_floor;
    }

    public int getRoom_number() {
        return room_number;
    }

    public void setRoom_number(int room_number) {
        this.room_number = room_number;
    }

    public String getRoom_type() {
        return room_type;
    }

    public void setRoom_type(String room_type) {
        this.room_type = room_type;
    }

    public int getRoom_star() {
        return room_star;
    }

    public void setRoom_star(int room_star) {
        this.room_star = room_star;
    }

    public String getRoom_description() {
        return room_description;
    }

    public void setRoom_description(String room_description) {
        this.room_description = room_description;
    }

    public String getRoom_building() {
        return room_building;
    }

    public void setRoom_building(String room_building) {
        this.room_building = room_building;
    }
}
