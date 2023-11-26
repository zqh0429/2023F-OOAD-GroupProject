package com.example.springproject.dto.team;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(description = "Team Create form")
public class TeamCreationForm {
    @ApiModelProperty
    private String creatorId;
    @NotBlank(message = "The name of team shouldn't be null")
    @ApiModelProperty(value = "team_name")
    private String team_name;
    @ApiModelProperty(value = "team_description")
    private String team_description;
}