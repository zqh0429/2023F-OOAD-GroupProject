package com.example.springproject.service.student.impl;

import com.example.springproject.config.MyException;
import com.example.springproject.domain.StudentInfo;
import com.example.springproject.domain.UserInfo;
import com.example.springproject.dto.student.StudentDto;
import com.example.springproject.dto.student.StudentInformationForm;
import com.example.springproject.repository.StudentRepository;
import com.example.springproject.repository.UserRepository;
import com.example.springproject.service.student.StudentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository, UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public StudentDto save(StudentInfo studentInfo) {
        StudentInfo student = studentRepository.saveAndFlush(studentInfo);
        return student.convertToStudentDto();
    }

    @Override
    public StudentDto initializeInformation(StudentInformationForm studentInformationForm, BindingResult result) {
        if (result.hasErrors()) {
            List<FieldError> errors = result.getFieldErrors();
            throw new MyException(7, errors.get(0).getDefaultMessage());
        } else {
            UserInfo userInfo = findUserByUserId(studentInformationForm.getStudentId());
            StudentInfo studentInfo = new StudentInfo(userInfo, studentInformationForm.getGender(), studentInformationForm.getDegree(), studentInformationForm.getMajor(),
                    studentInformationForm.getUndergraduateSchool(), studentInformationForm.getStudentDescription(), studentInformationForm.getHomeTown(), studentInformationForm.getSleepTime(), studentInformationForm.getWakeTime(),
                    studentInformationForm.getCircleUrl());
            return save(studentInfo);
        }
    }

    @Override
    public UserInfo findUserByUserId(String userId) {
        return userRepository.findUserByUserId(userId);
    }

    @Override
    public StudentInformationForm showInformation(StudentDto studentDto) {
        StudentInfo studentInfo = studentRepository.findStudentInfoById(studentDto.getStudentId()).get(0);
        return studentInfo.convertToStudentInformationForm();
    }

    @Override
    public StudentDto updateInformation(StudentInformationForm studentInformationForm, BindingResult result) {
        if (result.hasErrors()) {
            List<FieldError> errors = result.getFieldErrors();
            throw new MyException(7, errors.get(0).getDefaultMessage());
        } else {
//            studentRepository.updateStudentInformation(studentInformationForm.getGender(), studentInformationForm.getDegree(), studentInformationForm.getMajor(), studentInformationForm.getUndergraduateSchool(), studentInformationForm.getStudentDescription(), studentInformationForm.getStudentId());
//            return new StudentDto(studentInformationForm.getStudentId(), studentInformationForm.getGender());
            UserInfo userInfo = findUserByUserId(studentInformationForm.getStudentId());
            StudentInfo studentInfo = new StudentInfo(userInfo, studentInformationForm.getGender(), studentInformationForm.getDegree(), studentInformationForm.getMajor(),
                    studentInformationForm.getUndergraduateSchool(), studentInformationForm.getStudentDescription(), studentInformationForm.getHomeTown(), studentInformationForm.getSleepTime(), studentInformationForm.getWakeTime(),
                    studentInformationForm.getCircleUrl());
            return save(studentInfo);
        }
    }

    @Override
    public List<StudentInformationForm> findall() {
        List<StudentInfo> studentInfos = studentRepository.findAll();
        List<StudentInformationForm> studentInformationForms = new ArrayList<>();
        for (StudentInfo studentInfo: studentInfos){
            studentInformationForms.add(studentInfo.convertToStudentInformationForm());
        }
        return studentInformationForms;
    }

    @Override
    public List<StudentInformationForm> findByGender(StudentDto studentDto) {
        List<StudentInfo> studentInfos = studentRepository.findStudentInfoByGender(studentDto.getStudentGender());
        System.out.println(studentInfos.size());
        List<StudentInformationForm> studentInformationForms = new ArrayList<>();
        for (StudentInfo studentInfo: studentInfos) {
            studentInformationForms.add(studentInfo.convertToStudentInformationForm());
        }
        return studentInformationForms;
    }

}