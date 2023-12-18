package com.example.springproject.dto.student;


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
public class DormitoryselectedDto {
    @ApiModelProperty
    private int teamid;
    @ApiModelProperty
    private String leaderid;
    @ApiModelProperty
    private String mem_one_id;
    @ApiModelProperty
    private String mem_two_id;
    @ApiModelProperty
    private String mem_three_id;
    @ApiModelProperty
    private int room_id;
}
