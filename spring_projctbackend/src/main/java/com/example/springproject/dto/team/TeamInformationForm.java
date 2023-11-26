package com.example.springproject.dto.team;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(description = "Team Information form")
public class TeamInformationForm {
    @ApiModelProperty
    private int team_id;
    @ApiModelProperty
    private String team_name;
    @ApiModelProperty
    private int team_member_number;
    @ApiModelProperty
    private String team_description;
    @ApiModelProperty
    private Integer selected_room_id;
    @ApiModelProperty
    private String leader_id;
    @ApiModelProperty
    private String first_member_id;
    @ApiModelProperty
    private String second_member_id;
    @ApiModelProperty
    private String third_member_id;
}