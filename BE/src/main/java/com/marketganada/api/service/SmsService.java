package com.marketganada.api.service;

import com.marketganada.api.request.UserPwFindRequest;
import com.marketganada.db.entity.User;

public interface SmsService {
    String sendUserPw(User user, UserPwFindRequest userPwFindRequest);
}