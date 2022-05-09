package com.marketganada.config.oauth;

import com.marketganada.db.entity.User;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;


@Getter
public class OAuthAttributes {

    private Map<String, Object> attributes; // OAuth2 반환하는 유저 정보 Map
    private String nickname;
    private String email;
    private String picture;


    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nickname, String email, String picture) {
        this.attributes = attributes;
        this.nickname = nickname;
        this.email = email;
        this.picture = picture;
    }

    public static OAuthAttributes of(String registrationId, Map<String, Object> attributes) {

        if ("kakao".equals(registrationId)) {
            return ofKakao(attributes);
        }

        return ofGoogle(attributes);
    }

    private static OAuthAttributes ofKakao(Map<String, Object> attributes) {
        // kakao는 kakao_account에 유저정보가 있다. (email)
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        // kakao_account안에 또 profile이라는 JSON객체가 있다. (nickname, profile_image)
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");

        return OAuthAttributes.builder()
                .nickname((String) kakaoProfile.get("nickname"))
                .email((String) kakaoAccount.get("email"))
                .picture((String) kakaoProfile.get("profile_image_url"))
                .attributes(attributes)
                .build();
    }

    private static OAuthAttributes ofGoogle(Map<String, Object> attributes) {

        return OAuthAttributes.builder()
                .nickname((String) attributes.get("google_"+attributes.get("sub")))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
                .attributes(attributes)
                .build();
    }
    public User toEntity(){
        User user = new User();
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        user.setUserNickname(nickname);
        user.setUserEmail(email);
        user.setUserPw(bCryptPasswordEncoder.encode("social_login"));
        user.setRole("ROLE_USER");
        user.setGrade("일반 회원");
        user.setProfileImageUrl(picture);
        user.setUserType(1);

        return user;
    }
}