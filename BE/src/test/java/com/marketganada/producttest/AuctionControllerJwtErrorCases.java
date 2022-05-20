package com.marketganada.producttest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marketganada.api.request.AuctionInsertRequest;
import com.marketganada.api.request.LikeRequest;
import com.marketganada.api.request.PaymentInsertRequest;
import com.marketganada.api.request.TrackingNumUpdateRequest;
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
public class AuctionControllerJwtErrorCases {
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
    }

    @Test
    @Order(0)
    void settingWrongAccessToken() {
        accessToken = "dummy";
    }

    @Test
    @Order(1)
    void insertAuctionTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auction")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json")
                        .content((new JSONObject(oMapper.writeValueAsString(auction)).toString())))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(2)
    void getAuctionPhoneListTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/auction/phone?page=-1" +
                                "&sort=id&brand=브랜드&model=모델&save=저장장치")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(3)
    void getAuctionEarphoneListTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/auction/earphone?page=-1" +
                                "&sort=id&brand=브랜드&model=모델")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(4)
    void insertAuctionLikeTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auction/like")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json")
                        .content((new JSONObject(oMapper.writeValueAsString(like)).toString())))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(5)
    void getAuctionDetailTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/auction/"+TEST_AUCTION_ID)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(6)
    void deleteAuctionLikeTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/auction/like/"+TEST_AUCTION_ID)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(7)
    void deleteAuctionTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/auction/"+TEST_AUCTION_ID)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(18)
    void getAuctionRecentListTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/auction?page=0")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }



    @Test
    @Order(8)
    void insertPaymentTest() throws Exception {
        PaymentInsertRequest p = new PaymentInsertRequest();
        p.setPrice(1234);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/payment")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content((new JSONObject(oMapper.writeValueAsString(p)).toString())))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(9)
    void insertTrackTest() throws Exception {
        TrackingNumUpdateRequest t = new TrackingNumUpdateRequest();
        t.setTrackingNum("0000");
        t.setCourier("!?!?");

        mockMvc.perform(MockMvcRequestBuilders.put("/api/payment/tracking/-1")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content((new JSONObject(oMapper.writeValueAsString(t)).toString())))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(10)
    void confirmPaymentTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/payment/confirm/-1")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }
}
