package com.marketganada.config.oauth;

import com.marketganada.config.auth.GanadaUserDetails;
import com.marketganada.db.entity.User;
import com.marketganada.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private BCryptPasswordEncoder encodePwd;
    @Autowired
    private UserRepository userRepository;

    //구글로 부터 받은 userRequest 데이터를 처리하는 함수
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        //구글 로그인 번호 클릭 -> 구글 로그인 창 -> 구글 로그인 완료 -> code를 리턴 (OAuth-Client 라이브러리)-> AccessToken 요청
        //userRequest 정보 -> loadUser 함수 호출 -> 구글로부터 회원 프로필 받기

        System.out.println("getClientRegistration: "+ userRequest.getClientRegistration());
        System.out.println("getAccessToken: "+ userRequest.getAccessToken().getTokenValue());
        System.out.println("getAttributes: "+ oAuth2User.getAttributes());

        String provider = userRequest.getClientRegistration().getRegistrationId(); //google
        OAuthAttributes attributes = OAuthAttributes.of(provider,oAuth2User.getAttributes());

        User user = saveOrUpdate(attributes);

        return new GanadaUserDetails(user,oAuth2User.getAttributes(),provider);
    }
    private User saveOrUpdate(OAuthAttributes attributes){
        Optional<User> checkUser = userRepository.findByUserEmail(attributes.getEmail());

        if(!checkUser.isPresent()){
            User user = attributes.toEntity();
            System.out.println("최초 , 회원가입 진행");
            return userRepository.save(user);
        }else{
            System.out.println("로그인을 이미 한 유저입니다.");
            return userRepository.save(checkUser.get());
        }

    }

//    private User registerNewUser(OAuth2User oAuth2User,String provider ) {
//        User user = new User();
//
//        user.setUserNickname(provider+"_"+oAuth2User.getAttribute("sub")); //google_106884161879893468060
//        user.setUserEmail(oAuth2User.getAttribute("email"));
//        user.setUserPw(encodePwd.encode("social_login"));
//        user.setRole("ROLE_USER");
//        user.setGrade("일반 회원");
//        user.setProfileImageUrl(oAuth2User.getAttribute("picture"));
//        user.setUserType(1);
//        return userRepository.save(user);
//    }

}
