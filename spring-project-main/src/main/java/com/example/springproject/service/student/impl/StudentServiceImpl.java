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
        StudentInfo student = studentRepository.save(studentInfo);
        return convertStudent(student);
    }

    @Override
    public StudentDto initializeInformation(StudentInformationForm studentInformationForm, BindingResult result) {
        if (result.hasErrors()) {
            List<FieldError> errors = result.getFieldErrors();
            throw new MyException(7, errors.get(0).getDefaultMessage());
        } else {
            UserInfo userInfo = findUserByUserId(studentInformationForm.getStudentId());
            StudentInfo studentInfo = new StudentInfo(userInfo, studentInformationForm.getGender(), studentInformationForm.getDegree(), studentInformationForm.getMajor(), studentInformationForm.getUndergraduateSchool(), studentInformationForm.getStudentDescription());
            return save(studentInfo);
        }
    }

    @Override
    public StudentDto convertStudent(StudentInfo studentInfo) {
        return StudentDto.builder()
                .studentId(studentInfo.getStudentId().getUserInfo().getUserId())
                .studentGender(studentInfo.getGender())
                .build();
    }


    @Override
    public List<StudentInfo> findStudentInfoByUserID(String id) {
        return studentRepository.findStudentInfoByUserID(id);
    }

    @Override
    public UserInfo findUserByUserId(String userId) {
        return userRepository.findUserByUserId(userId);
    }

}
