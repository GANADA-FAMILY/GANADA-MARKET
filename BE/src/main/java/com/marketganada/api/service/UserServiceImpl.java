package com.marketganada.api.service;

import com.marketganada.api.request.UserLoginRequest;
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
        Optional<User> duplicateCheckId = userRepository.findByUserEmail(userSignUpRequest.getUserEmail());
        if(duplicateCheckId.isPresent()){
            return "fail";
        }
        Optional<User> duplicateCheckNickname = userRepository.findByUserNickname(userSignUpRequest.getUserNickname());
        if(duplicateCheckNickname.isPresent()){
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


}
