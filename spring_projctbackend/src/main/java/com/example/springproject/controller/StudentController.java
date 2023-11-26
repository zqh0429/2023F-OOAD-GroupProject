package com.example.springproject.controller;

import com.example.springproject.dto.student.StudentDto;
import com.example.springproject.dto.student.StudentInformationForm;
import com.example.springproject.service.student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/student")
public class StudentController {
    private final StudentService studentService;
    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    /**
     * 学生初始化个人信息
     */
    @PostMapping("/information/initialize")
    public StudentDto initializeInformation(@RequestBody @Valid StudentInformationForm studentInformationForm, BindingResult bindingResult) {
        return studentService.initializeInformation(studentInformationForm, bindingResult);
    }

    /**
     * 学生查看个人信息
     */
    @GetMapping("/information/show")
    public StudentInformationForm findStudentInformation(@RequestBody StudentDto studentDto) {
        return studentService.showInformation(studentDto);
    }

    /**
     * 学生修改个人信息
     */
    @PostMapping("information/modify")
    public StudentDto updateStudentInformation(@RequestBody @Valid StudentInformationForm studentInformationForm, BindingResult bindingResult) {
        return studentService.updateInformation(studentInformationForm, bindingResult);
    }

    @GetMapping("/informations")
    public List<StudentInformationForm> findAll(@RequestBody StudentDto studentDto) {
        System.out.println(studentDto.getStudentId());
        return studentService.findall();
    }

    @GetMapping("/test")
    public List<StudentInformationForm> initializeInformation(@RequestBody StudentDto studentDto) {
        System.out.println(studentDto.getStudentGender() + studentDto);
        return studentService.findByGender(studentDto);
    }
}