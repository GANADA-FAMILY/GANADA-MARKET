package com.marketganada.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.HashMap;
import java.util.Map;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
public class AuthControllerNegativeCases {
    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper objectMapper = new ObjectMapper();

    private static String accessToken;



    @Test
    @Order(1)
    void signupFailTest() throws Exception {
        Map<String, String> input = new HashMap<>();
        input.put("userEmail", "tttttestcom");  // 유효성검사 Email 형식
        input.put("userPw", "test123!@#");
        input.put("userNickname", "테스트유저");
        input.put("userPhone", "01098989898");
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(input)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        Map<String, String> input2 = new HashMap<>();
        input2.put("userEmail", "ttttt@test.com");
        input2.put("userPw", "t"); // 유효성검사 8~16자리
        input2.put("userNickname", "테스트유저");
        input2.put("userPhone", "01098989898");
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input2)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        Map<String, String> input3 = new HashMap<>();
        input3.put("userEmail", "ttttt@test.com");
        input3.put("userPw", "test123!@#");
        input3.put("userNickname", "");  // 유효성검사 NotBlank
        input3.put("userPhone", "01098989898");
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input3)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        Map<String, String> input4 = new HashMap<>();
        input4.put("userEmail", "ttttt@test.com");
        input4.put("userPw", "test123!@#");
        input4.put("userNickname", "테스트유저");
        input4.put("userPhone", ""); // 유효성검사 NotBlank
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input4)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        Map<String, String> input5 = new HashMap<>();
        input5.put("userEmail", "ttttt@test.com"); // 중복 이메일
        input5.put("userPw", "test123!@#");
        input5.put("userNickname", "테스트유저2");
        input5.put("userPhone", "01098989898");
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input5)))
                .andExpect(MockMvcResultMatchers.status().isConflict())
                .andDo(MockMvcResultHandlers.print());

        Map<String, String> input6 = new HashMap<>();
        input6.put("userEmail", "ttttt@test.com");
        input6.put("userPw", "test123!@#");
        input6.put("userNickname", "TestUser"); // 중복 닉네임
        input6.put("userPhone", "01098989898");
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input6)))
                .andExpect(MockMvcResultMatchers.status().isConflict())
                .andDo(MockMvcResultHandlers.print());
    }


}
