package com.example.springproject.dto.Room;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@ApiModel
@NoArgsConstructor
@AllArgsConstructor
public class RoomForm {

    @NotBlank(message = "building shouldn't be null")
    @ApiModelProperty
    private String building;

    @NotBlank(message = "region shouldn't be null")
    @ApiModelProperty
    private String region;

    @NotBlank(message = "floor shouldn't be null")
    @ApiModelProperty
    private int floor;

    @NotBlank(message = "number shouldn't be null")
    @ApiModelProperty
    private int number;

    @NotBlank(message = "description shouldn't be null")
    @ApiModelProperty
    private String description;

    @NotBlank(message = "type shouldn't be null")
    @ApiModelProperty
    private String type;
}
