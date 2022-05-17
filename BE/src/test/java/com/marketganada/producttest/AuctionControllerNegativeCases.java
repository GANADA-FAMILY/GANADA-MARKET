package com.marketganada.producttest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marketganada.api.request.AuctionInsertRequest;
import com.marketganada.api.request.LikeRequest;
import com.marketganada.api.request.UserLoginRequest;
import org.json.JSONObject;
import org.junit.jupiter.api.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
public class AuctionControllerNegativeCases {
    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper oMapper = new ObjectMapper();
    Logger logger = LoggerFactory.getLogger(ProductControllerPositiveCases.class);
    private static String accessToken;
    private static AuctionInsertRequest auction;
    private static LikeRequest like;

    private static final int TEST_AUCTION_ID = -1;

    @BeforeAll
    public static void setup() {

        auction = new AuctionInsertRequest();

        like = new LikeRequest();
        like.setAuctionId(Long.valueOf(-1));
    }

    @Test
    @Order(0)
    void getAccessToken() throws Exception {
        UserLoginRequest userLogin = new UserLoginRequest();
        userLogin.setUserEmail("tttt@test.com");
        userLogin.setUserPw("test123!@#");

        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                        .header("Accept", "application/json")
                        .contentType("application/json")
                        .content((new JSONObject(oMapper.writeValueAsString(userLogin)).toString())))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());

        accessToken = new JSONObject(result.andReturn().getResponse().getContentAsString()).getString("token");
    }

    @Test
    @Order(1)
    void insertAuctionTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/auction")
                        .file("auctionImages",null)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType(MediaType.MULTIPART_FORM_DATA_VALUE))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(2)
    void getAuctionPhoneListTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/auction/phone?page=-1" +
                                "&sort=id&brand=브랜드&model=모델&save=저장장치")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(3)
    void getAuctionEarphoneListTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/auction/earphone?page=-1" +
                                "&sort=id&brand=브랜드&model=모델")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(4)
    void insertAuctionLikeTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auction/like")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json")
                        .content((new JSONObject(oMapper.writeValueAsString(like)).toString())))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(5)
    void getAuctionDetailTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/auction/"+TEST_AUCTION_ID)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(6)
    void deleteAuctionLikeTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/auction/like/"+TEST_AUCTION_ID)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(7)
    void deleteAuctionTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/auction/"+TEST_AUCTION_ID)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andDo(MockMvcResultHandlers.print());
    }
}
