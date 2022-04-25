package com.marketganada.api.contoroller;

import com.marketganada.api.response.BaseResponseBody;
import com.marketganada.api.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "유저 API", tags = {"User."})
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @ApiOperation("jwt 테스트")
    @GetMapping("/test")
    public ResponseEntity<? extends BaseResponseBody> updateUserNickname(@ApiIgnore Authentication authentication) {


        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "토큰 인증 성공"));
    }
}
