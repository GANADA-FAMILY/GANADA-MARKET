package com.marketganada.config.oauth;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import com.marketganada.api.service.UserService;
import com.marketganada.config.auth.GanadaUserDetails;
import com.marketganada.config.auth.JwtTokenUtil;
import com.marketganada.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;  import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@RequiredArgsConstructor @Component
public class Oauth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        GanadaUserDetails oAuth2User = (GanadaUserDetails)authentication.getPrincipal();
        if(oAuth2User.getProvider().equals("kakao")){
            System.out.println("getAttributes"+ oAuth2User.getAttributes());

            Map<String, Object> kakaoAccount = oAuth2User.getAttribute("kakao_account");
            User user = userService.getUserByUserEmail((String) kakaoAccount.get("email")).get();
            System.out.println("카카오");
            writeTokenResponse(response, JwtTokenUtil.getToken(user.getUserEmail()));

        }else{
            System.out.println("구글");
            System.out.println((String) oAuth2User.getAttribute("email"));
            User user = userService.getUserByUserEmail(oAuth2User.getAttribute("email")).get();

            writeTokenResponse(response, JwtTokenUtil.getToken(user.getUserEmail()));
        }

    }
    private void writeTokenResponse(HttpServletResponse response, String token) throws IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.setContentType("application/json;charset=UTF-8");

        Map<String, Object> data = ImmutableMap.of(
                "token", token
        );
        System.out.println(token);
        response.sendRedirect("http://localhost:3000/oauth/redirect");
        PrintWriter pw = response.getWriter();
        pw.print(new ObjectMapper().writeValueAsString(data));
        pw.flush();
    }
}