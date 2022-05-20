package com.marketganada.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marketganada.api.request.UserPwFindRequest;
import org.json.JSONObject;
import org.junit.jupiter.api.*;
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
public class AuthControllerPositiveCases {
    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper objectMapper = new ObjectMapper();

    private static String accessToken;

    private static Map<String, String> input;

    private static UserPwFindRequest userPwFindRequest;

    @BeforeAll
    public static void setup() {
        input = new HashMap<>();
        input.put("userEmail", "asdasd@test.com");
        input.put("userPw", "test123!@#");
        input.put("userNickname", "asdasd");
        input.put("userPhone", "01012349898");

        userPwFindRequest = new UserPwFindRequest();
        userPwFindRequest.setUserEmail("asdasd@test.com");
        userPwFindRequest.setUserPhone("01012349898");
    }

    @Test
    @Order(0)
    void checkNotDuplicateNicknameTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/duplicate-nickname/" + input.get("userNickname")))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(1)
    void signupTest() throws Exception {
        String test = objectMapper.writeValueAsString(input);
        System.out.println(test);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(input)))
                .andExpect(MockMvcResultMatchers.status().is2xxSuccessful())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(2)
    void loginTest() throws Exception {
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(input)))
                .andExpect(MockMvcResultMatchers.status().is2xxSuccessful())
                .andDo(MockMvcResultHandlers.print());
        accessToken =  new JSONObject(result.andReturn().getResponse().getContentAsString()).getString("token");
    }

    @Test
    @Order(3)
    void checkDuplicateNicknameTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/duplicate-nickname/" + input.get("userNickname")))
                .andExpect(MockMvcResultMatchers.status().isConflict())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(4)
    void findPwTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/auth/find-pw")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content((new JSONObject(objectMapper.writeValueAsString(userPwFindRequest)).toString())))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(5)
    void findEmailTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/find-email/" + input.get("userPhone")))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(6)
    void deleteUserTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/user")
                        .header(HttpHeaders.AUTHORIZATION,"Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().is2xxSuccessful())
                .andDo(MockMvcResultHandlers.print());
    }


}
