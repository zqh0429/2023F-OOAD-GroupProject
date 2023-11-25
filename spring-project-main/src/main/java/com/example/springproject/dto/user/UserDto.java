package com.example.springproject.dto.user;

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
public class UserDto {

//    @ApiModelProperty
//    private int id;
    @ApiModelProperty
    private String userId;
    @ApiModelProperty
    private String username;
    @ApiModelProperty
    private String password;
    @ApiModelProperty
    private int status;

}
