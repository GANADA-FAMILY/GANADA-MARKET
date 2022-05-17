package com.marketganada.producttest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marketganada.api.request.*;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
public class AuctionControllerPositiveCases {
    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper oMapper = new ObjectMapper();
    Logger logger = LoggerFactory.getLogger(ProductControllerPositiveCases.class);
    private static String accessToken;
    private static MockMultipartFile mFile;
    private static List<MultipartFile> fileList;
    private static AuctionInsertRequest auctionPhone;
    private static AuctionInsertRequest auctionEarphone;
    private static LikeRequest like;

    private static Long auctionPhoneId;
    private static Long auctionEarphoneId;

    private static SimpleDateFormat simpleDateFormat;

    private static final Long TEST_PRODUCT_PHONE_ID = Long.valueOf(21);
    private static final Long TEST_PRODUCT_EARPHONE_ID = Long.valueOf(23);

    @BeforeAll
    public static void setup() throws Exception {
		String name = "file";
		String originalFileName = "test.jpg";
		String fileFullPath = ".\\test.jpg";

		mFile = new MockMultipartFile(name, originalFileName, MediaType.IMAGE_JPEG_VALUE, new FileInputStream(fileFullPath));
		fileList = new ArrayList<>();
		fileList.add(mFile);

        name = "file";
        originalFileName = "서명용.png";
        fileFullPath = ".\\서명용.png";
        mFile = new MockMultipartFile(name, originalFileName, MediaType.IMAGE_PNG_VALUE, new FileInputStream(fileFullPath));
		fileList.add(mFile);

        simpleDateFormat = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss");

		auctionPhone = new AuctionInsertRequest();
		auctionPhone.setAuctionTitle("sample title");
		auctionPhone.setCycle(1);
		auctionPhone.setDepreciation(100);
        auctionPhone.setDescription("sample desc");
		auctionPhone.setEndTime(simpleDateFormat.format(new Date()));
		auctionPhone.setStartPrice(10000);
        auctionPhone.setProductId(TEST_PRODUCT_PHONE_ID);

        auctionEarphone = new AuctionInsertRequest();
        auctionEarphone.setAuctionTitle("sample title");
        auctionEarphone.setCycle(1);
        auctionEarphone.setDepreciation(100);
        auctionEarphone.setDescription("sample desc");
        auctionEarphone.setEndTime(simpleDateFormat.format(new Date()));
        auctionEarphone.setStartPrice(10000);
        auctionEarphone.setProductId(TEST_PRODUCT_EARPHONE_ID);

        like = new LikeRequest();
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
    void insertAuctionPhoneTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/auction")
                        .file("auctionImages",fileList.get(0).getBytes())
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .param("auctionTitle", auctionPhone.getAuctionTitle())
                        .param("description", auctionPhone.getDescription())
                        .param("productId", String.valueOf(auctionPhone.getProductId()))
                        .param("endTime", auctionPhone.getEndTime())
                        .param("depreciation", String.valueOf(auctionPhone.getDepreciation()))
                        .param("cycle", String.valueOf(auctionPhone.getCycle()))
                        .param("startPrice", String.valueOf(auctionPhone.getStartPrice()))
                        .contentType(MediaType.MULTIPART_FORM_DATA_VALUE))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(2)
    void insertAuctionEarphoneTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/auction")
                        .file("auctionImages",fileList.get(0).getBytes())
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .param("auctionTitle", auctionEarphone.getAuctionTitle())
                        .param("description", auctionEarphone.getDescription())
                        .param("productId", String.valueOf(auctionEarphone.getProductId()))
                        .param("endTime", auctionEarphone.getEndTime())
                        .param("depreciation", String.valueOf(auctionEarphone.getDepreciation()))
                        .param("cycle", String.valueOf(auctionEarphone.getCycle()))
                        .param("startPrice", String.valueOf(auctionEarphone.getStartPrice()))
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(3)
    void getAuctionPhoneListTest() throws Exception {
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.get("/api/auction/phone?page=0" +
                                "&sort=auctionId,DESC&brand=apple&model=아이폰12 미니&save=256GB")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());

        JSONObject tmp = new JSONObject(result.andReturn().getResponse().getContentAsString());
        JSONArray resultArray = tmp.getJSONArray("auctionList");
        tmp = resultArray.getJSONObject(0);

        auctionPhoneId = tmp.getLong("auctionId");
    }

    @Test
    @Order(4)
    void getAuctionEarphoneListTest() throws Exception {
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.get("/api/auction/earphone?page=0" +
                                "&sort=auctionId,DESC&brand=SAMSUNG&model=Galaxy Buds")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());

        JSONObject tmp = new JSONObject(result.andReturn().getResponse().getContentAsString());
        JSONArray resultArray = tmp.getJSONArray("auctionList");
        tmp = resultArray.getJSONObject(0);

        auctionEarphoneId = tmp.getLong("auctionId");
    }

    @Test
    @Order(5)
    void insertAuctionLikeTest() throws Exception {
        like.setAuctionId(auctionPhoneId);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/auction/like")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json")
                        .content((new JSONObject(oMapper.writeValueAsString(like)).toString())))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(6)
    void getAuctionDetailTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/auction/"+auctionPhoneId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(7)
    void deleteAuctionLikeTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/auction/like/"+auctionPhoneId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(8)
    void deleteAuctionPhoneTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/auction/"+auctionPhoneId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(9)
    void deleteAuctionEarphoneTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/auction/"+auctionEarphoneId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(10)
    void getAuctionRecentListTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/auction?page=0")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }
}
