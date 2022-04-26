package com.marketganada.api.service;

import com.marketganada.api.request.UserLoginRequest;
import com.marketganada.api.request.UserSignUpRequest;
import com.marketganada.db.entity.User;

import java.util.Optional;

public interface UserService  {
    String login(UserLoginRequest userLoginRequest);
    String insertUser(UserSignUpRequest userSignUpRequest);
    Optional<User> getUserByUserEmail(String userEmail);

}
