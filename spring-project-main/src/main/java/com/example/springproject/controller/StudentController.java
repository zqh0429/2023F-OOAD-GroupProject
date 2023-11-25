package com.example.springproject.controller;

import com.example.springproject.dto.student.StudentDto;
import com.example.springproject.dto.student.StudentInformationForm;
import com.example.springproject.service.student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/student")
public class StudentController {
    private final StudentService studentService;
    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/informationInitialization")
    public StudentDto initializeInformation(@RequestBody @Valid StudentInformationForm studentInformationForm, BindingResult bindingResult) {
        return studentService.initializeInformation(studentInformationForm, bindingResult);
    }

    @GetMapping()
    public StudentInformationForm findStudentInformation(@PathVariable String studentId) {
        return null;
    }
}
