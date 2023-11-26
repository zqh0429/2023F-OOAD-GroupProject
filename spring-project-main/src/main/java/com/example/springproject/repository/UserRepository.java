package com.example.springproject.repository;

import com.example.springproject.domain.UserInfo;
//import com.example.springproject.domain.message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


public interface UserRepository extends JpaRepository<UserInfo, String> {
    public UserInfo findUserByUsername(String username);
    public UserInfo findUserByUserIdAndPassword(String userId, String password);
    public UserInfo findUserByUserId(String userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM UserInfo u WHERE u.userId = :userId")
    void deleteUserInfoByUserId(@Param("userId") String userId);
}
