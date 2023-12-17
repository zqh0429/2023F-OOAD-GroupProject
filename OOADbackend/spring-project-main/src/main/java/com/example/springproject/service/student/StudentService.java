package com.example.springproject.service.student;

import com.example.springproject.domain.StudentInfo;
import com.example.springproject.domain.UserInfo;
import com.example.springproject.dto.student.StudentDto;
import com.example.springproject.dto.student.StudentInformationForm;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface StudentService {
    /**
     * 初始化添加学生信息
     */
    public StudentDto save(StudentInfo studentInfo);
    public StudentDto initializeInformation(StudentInformationForm studentInformationForm, BindingResult result);
    //    public StudentDto convertStudent(StudentInfo studentInfo);
    public UserInfo findUserByUserId(String userId);
    public StudentInformationForm showInformation(StudentDto studentDto);
    public StudentDto updateInformation(StudentInformationForm studentInformationForm, BindingResult result);
    public List<StudentInformationForm> findall();
    public List<StudentInformationForm> findByGender(StudentDto studentDto);

}