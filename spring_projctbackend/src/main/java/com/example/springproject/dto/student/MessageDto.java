package com.example.springproject.dto.student;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@ApiModel
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    @ApiModelProperty
    private String senderid;
    @ApiModelProperty
    private String content;
    @ApiModelProperty
    private String receiverid;
    @ApiModelProperty
    private Date timestamp;

}
