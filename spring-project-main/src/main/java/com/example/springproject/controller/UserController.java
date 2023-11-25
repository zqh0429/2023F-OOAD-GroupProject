package com.example.springproject.controller;

import com.example.springproject.dto.user.UserDto;
import com.example.springproject.dto.user.UserRegisterForm;
import com.example.springproject.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public UserDto checkLogin(@RequestBody UserDto userDto) {
        return userService.checkLogin(userDto);
    }

    @PostMapping("/register")
    public UserDto registerUser(@RequestBody @Valid UserRegisterForm userRegisterForm, BindingResult result) {
        return userService.registerUser(userRegisterForm, result);
    }
}
