package com.example.springproject.dto.team;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@ApiModel
@NoArgsConstructor
@AllArgsConstructor
public class TeamDto {
    @ApiModelProperty
    private int teamId;
    @ApiModelProperty
    private String studentId;
}