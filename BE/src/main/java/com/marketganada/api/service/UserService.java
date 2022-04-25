package com.marketganada.api.service;

import com.marketganada.api.request.UserLoginRequest;

public interface UserService  {
    String login(UserLoginRequest userLoginRequest);
}
