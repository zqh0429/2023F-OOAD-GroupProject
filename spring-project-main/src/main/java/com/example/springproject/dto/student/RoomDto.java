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
public class RoomDto {
    @ApiModelProperty
    private int roomid;
    @ApiModelProperty
    private boolean selected;
}
