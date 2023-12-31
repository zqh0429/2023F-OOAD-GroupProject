package com.example.springproject.controller;

import com.example.springproject.dto.user.UserDto;
import com.example.springproject.dto.user.UserRegisterForm;
import com.example.springproject.service.user.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * 用户登陆
     */
//    @PostMapping("/login/")
//    public UserDto checkLogin(@RequestBody UserDto userDto) {
//        return userService.checkLogin(userDto);
//    }
    @GetMapping("/login/")
    public UserDto checkLogin(@RequestParam String userId, @RequestParam String password) {
        UserDto userDto = UserDto.builder()
                .userId(userId)
                .password(password)
                .build();
        return userService.checkLogin(userDto);
    }

    /**
     * 用户注册
     */
    @PostMapping("/register")
    public UserDto registerUser(@RequestBody @Valid UserRegisterForm userRegisterForm, BindingResult result) {
        return userService.registerUser(userRegisterForm, result);
    }



}