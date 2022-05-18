package com.marketganada.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.HashMap;
import java.util.Map;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
public class UserControllerNegativeCases {
    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper objectMapper = new ObjectMapper();

    private static String accessToken;

    @Test
    @Order(1)
    void loginFailTest() throws Exception {
        Map<String, String> input = new HashMap<>();
        input.put("userEmail", "2222@test.com"); //잘못된 아이디
        input.put("userPw", "test123!@#");
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andDo(MockMvcResultHandlers.print());

        input.put("userEmail", "tttt@test.com");
        input.put("userPw", "wrongPw@#"); // 잘못된 비밀번호
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());

        input.put("userEmail", "tttttestcom"); // 유효성검사 Email 형식
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        input.put("userEmail", "tttt@test.com");
        input.put("userPw", "t"); // 유효성검사 8~16자리
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

    }

    @Test
    @Order(2)
    void loginTest() throws Exception {
        Map<String, String> input = new HashMap<>();
        input.put("userEmail", "tttt@test.com");
        input.put("userPw", "test123!@#");
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(MockMvcResultMatchers.status().is2xxSuccessful())
                .andDo(MockMvcResultHandlers.print());
        accessToken =  new JSONObject(result.andReturn().getResponse().getContentAsString()).getString("token");
    }

    @Test
    @Order(3)
    void tokenFailTest() throws Exception {
        //토큰 미포함
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/test"))
                .andExpect(MockMvcResultMatchers.status().isForbidden())
                .andDo(MockMvcResultHandlers.print());
        //잘못된 토큰
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/test")
                .header(HttpHeaders.AUTHORIZATION,"Bearer wrongToken"))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
        //권한 밖 요청
        mockMvc.perform(MockMvcRequestBuilders.get("/api/admin")
                .header(HttpHeaders.AUTHORIZATION,"Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isForbidden())
                .andDo(MockMvcResultHandlers.print());
    }
}
