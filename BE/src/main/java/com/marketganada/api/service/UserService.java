package com.marketganada.api.service;

import com.marketganada.api.request.*;
import com.marketganada.db.entity.User;

import java.util.Optional;

public interface UserService  {
    String login(UserLoginRequest userLoginRequest);
    String insertUser(UserSignUpRequest userSignUpRequest);
    Optional<User> getUserByUserEmail(String userEmail);
    String checkDuplicateUserEmail(String userEmail);
    String checkDuplicateUserNickname(String userNickname);
    String updateUserNickname(UserNicknameUpdateRequest userNicknameUpdateRequest, User user);
    String updateUserPw(UserPwUpdateRequest userPwUpdateRequest, User user);
    void updateUserBank(UserBankUpdateRequest userBankUpdateRequest, User user) throws Exception;

}
