package com.example.springproject.service.user;

import com.example.springproject.domain.UserInfo;
import com.example.springproject.dto.user.UserDto;
import com.example.springproject.dto.user.UserRegisterForm;
import javax.validation.Valid;
import org.springframework.validation.BindingResult;

public interface UserService {
    /**
     * Functionality Desc:
     *   保存用户注册信息
     * @param userInfo :
     * @return
     * @author Jiachen<zhangjc1999 @ gmail.com>
     * @date   2020/10/30 9:18 下午
     */
    public UserDto save(UserInfo userInfo);

    /**
     * Functionality Desc:
     *   检测登陆状态
     * @param userInfo :
     * @return
     * @author Jiachen<zhangjc1999 @ gmail.com>
     * @date   2020/10/30 9:18 下午
     */
    public UserDto checkLogin(UserDto userInfo);

    UserInfo findByUserId(String userId);

    /**
     * Functionality Desc:
     *   根据用户名查找用户信息
     * @param username:
     * @return
     * @author Jiachen<zhangjc1999 @ gmail.com>
     * @date   2020/10/30 9:18 下午
     */
    public UserInfo findByUsername(String username);


    UserDto registerUser(@Valid UserRegisterForm userRegisterForm, BindingResult result);
}
