package com.marketganada.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileImageResponse {
    String profileImageUrl;

    public static ProfileImageResponse from(String profileImageUrl) {
        ProfileImageResponse res = new ProfileImageResponse();
        res.setProfileImageUrl(profileImageUrl);

        return res;
    }
}
