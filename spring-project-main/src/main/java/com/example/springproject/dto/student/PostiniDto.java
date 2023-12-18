package com.example.springproject.dto.student;

import io.swagger.annotations.ApiModelProperty;

public class PostiniDto {

    @ApiModelProperty
    private int id;
    @ApiModelProperty
    private String title;

    public PostiniDto(int id, String title) {
        this.id = id;
        this.title = title;
    }

    public PostiniDto() {
        // 无参构造函数
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
