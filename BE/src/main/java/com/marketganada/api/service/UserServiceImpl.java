package com.marketganada.api.service;

import com.marketganada.api.request.UserLoginRequest;
import com.marketganada.api.request.UserNicknameUpdateRequest;
import com.marketganada.api.request.UserPwUpdateRequest;
import com.marketganada.api.request.UserSignUpRequest;
import com.marketganada.db.entity.User;
import com.marketganada.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("userService")
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String login(UserLoginRequest userLoginRequest) {
        Optional<User> user = userRepository.findByUserEmail(userLoginRequest.getUserEmail());
        if(!user.isPresent()){
            return "fail1";
        }
        if (!passwordEncoder.matches(userLoginRequest.getUserPw(), user.get().getUserPw())) {
            return "fail2";
        }

        return "success";
    }

    @Override
    public String insertUser(UserSignUpRequest userSignUpRequest) {
       String duplicateCheckEmail =  checkDuplicateUserEmail(userSignUpRequest.getUserEmail());
        if(duplicateCheckEmail.equals("fail")){
            return "fail";
        }
        String duplicateCheckNickname =  checkDuplicateUserNickname(userSignUpRequest.getUserNickname());
        if(duplicateCheckNickname.equals("fail")){
            return "fail";
        }

        User user = new User();
        user.setUserEmail(userSignUpRequest.getUserEmail());
        user.setUserPw(passwordEncoder.encode(userSignUpRequest.getUserPw()));
        user.setUserNickname(userSignUpRequest.getUserNickname());
        user.setUserPhone(userSignUpRequest.getUserPhone());
        user.setRole("ROLE_USER");
        userRepository.save(user);
        return "success";
    }

    @Override
    public Optional<User> getUserByUserEmail(String userEmail) {
        Optional<User> user = userRepository.findByUserEmail(userEmail);
        return user;
    }

    @Override
    public String checkDuplicateUserEmail(String userEmail) {
        Optional<User> user = userRepository.findByUserEmail(userEmail);
        if(user.isPresent()){
            return "fail";
        }
        return "success";
    }

    @Override
    public String checkDuplicateUserNickname(String userNickname) {
        Optional<User> user = userRepository.findByUserNickname(userNickname);
        if(user.isPresent()){
            return "fail";
        }
        return "success";
    }

    @Override
    public String updateUserNickname(UserNicknameUpdateRequest userNicknameUpdateRequest, User user) {
        String res = checkDuplicateUserNickname(userNicknameUpdateRequest.getUserNickname());
        if(res.equals("success")){
            user.setUserNickname(userNicknameUpdateRequest.getUserNickname());

            userRepository.save(user);
            return "success";
        }else{
            return "fail";
        }
    }

    @Override
    public String updateUserPw(UserPwUpdateRequest userPwUpdateRequest, User user) {

        if (!passwordEncoder.matches(userPwUpdateRequest.getCurrentPw(), user.getUserPw())) {
            return "fail";
        }else{
            user.setUserPw(passwordEncoder.encode(userPwUpdateRequest.getNewPw()));
            userRepository.save(user);
            return "success";
        }

    }


}
