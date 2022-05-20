package com.marketganada.payment;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marketganada.api.request.AddressBookInsertRequest;
import com.marketganada.api.request.PaymentInsertRequest;
import com.marketganada.producttest.ProductControllerPositiveCases;
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

import java.util.HashMap;
import java.util.Map;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
public class PaymentControllerPositiveCases {
    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper oMapper = new ObjectMapper();
    Logger logger = LoggerFactory.getLogger(ProductControllerPositiveCases.class);
    private static String accessToken;

    private static Map<String, String> input;

    @BeforeAll
    public static void setup() throws Exception {

        input = new HashMap<>();
        input.put("userEmail", "tttt@test.com");
        input.put("userPw", "test123!@#");
    }

    @Test
    @Order(1)
    void loginTest() throws Exception {
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(oMapper.writeValueAsString(input)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
        accessToken =  new JSONObject(result.andReturn().getResponse().getContentAsString()).getString("token");
    }

    @Test
    @Order(2)
    void insertPaymentTest() throws Exception {
        PaymentInsertRequest p = new PaymentInsertRequest();
        p.setAuctionId();

        mockMvc.perform(MockMvcRequestBuilders.post("/api/payment/kakaoPaySuccess")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content((new JSONObject(oMapper.writeValueAsString(p)).toString())))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }
}
