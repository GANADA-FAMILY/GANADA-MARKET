package com.marketganada.config.auth;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;

import com.marketganada.api.service.UserService;
import com.marketganada.common.ResponseBodyWriteUtil;
import com.marketganada.db.entity.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;


public class JwtAuthenticationFilter extends BasicAuthenticationFilter {
	private UserService userService;

	public JwtAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService) {
		super(authenticationManager);
		this.userService = userService;

	}

    //인증이나 권한이 필요한 주소 요청이 있을 때 해당 필터를 타게 됨
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
        System.out.println("jwt 필터");
        String header = request.getHeader(JwtTokenUtil.HEADER_STRING); // 헤더로 실려오는 Authorization 받기

        if (header == null || !header.startsWith(JwtTokenUtil.TOKEN_PREFIX)) { // Authorization 값이 없거나 Bearer 로 시작하지 않으면
            filterChain.doFilter(request, response);
            System.out.println("토큰없음");
            return;
        }
        
        try {
            Authentication authentication = getAuthentication(request);
            // jwt 토큰으로 부터 획득한 인증 정보(authentication) 설정.
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception ex) {
            ResponseBodyWriteUtil.sendError(request, response, ex);
            return;
        }
        
        filterChain.doFilter(request, response);
	}
	
	@Transactional(readOnly = true)
    public Authentication getAuthentication(HttpServletRequest request) throws Exception {
        String token = request.getHeader(JwtTokenUtil.HEADER_STRING);
        // 요청 헤더에 Authorization 키값에 jwt 토큰이 포함된 경우에만, 토큰 검증 및 인증 처리 로직 실행.
        if (token != null) {
            //토큰을 구문 분석하고 유효성을 검사합니다(디코딩).
            JWTVerifier verifier = JwtTokenUtil.getVerifier(); //토큰 해독 객체 생성
            JwtTokenUtil.handleError(token); //에러처리
            DecodedJWT decodedJWT = verifier.verify(token.replace(JwtTokenUtil.TOKEN_PREFIX, "")); // 토큰 검증
            String userId = decodedJWT.getSubject();
            
            // 토큰 제목(사용자 이름)으로 사용자를 찾으면 DB에서 검색하여
            // 사용자 세부 정보를 가져오고 사용자 이름, 패스, 권한/역할을 사용하여 스프링 인증 토큰을 만듭니다.
            if (userId != null) {
                    // jwt 토큰에 포함된 계정 정보(userId) 통해 실제 디비에 해당 정보의 계정이 있는지 조회.
            		Optional<User> user = userService.getUserByUserEmail(userId);
                if(user.isPresent()) {
                        // 식별된 정상 유저인 경우, 요청 context 내에서 참조 가능한 인증 정보(jwtAuthentication) 생성.
                		GanadaUserDetails userDetails = new GanadaUserDetails(user.get());
                		UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(userId,
                				null, userDetails.getAuthorities());
                		jwtAuthentication.setDetails(userDetails);
                		return jwtAuthentication;
                }
            }
            return null;
        }
        return null;
    }
}
