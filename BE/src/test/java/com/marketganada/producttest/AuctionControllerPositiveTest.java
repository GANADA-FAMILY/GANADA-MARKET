package com.marketganada.producttest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marketganada.api.request.*;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.TestInstance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class AuctionControllerPositiveTest {
    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper oMapper = new ObjectMapper();
    Logger logger = LoggerFactory.getLogger(ProductControllerPositiveTest.class);
    private static String accessToken;
    private static MockMultipartFile mFile;
    private static AuctionInsertRequest auction;
    private static LikeRequest like;

    private static final int TEST_PRODUCT_ID = 1;

    @BeforeAll
    public static void setup() throws Exception {
		String name = "file";
		String originalFileName = "test.jpg";
		String fileFullPath = ".\\test.jpg";

		mFile = new MockMultipartFile(name, originalFileName, "image/jpg", new FileInputStream(fileFullPath));
		List<MultipartFile> fileList = new ArrayList<>();
		fileList.add(mFile);

		auction = new AuctionInsertRequest();
		auction.setAuctionTitle("sample title");
		auction.setAuctionImages(fileList);
		auction.setCycle(new Date());
		auction.setDepreciation(100);
		auction.setEndTime(new Date());
		auction.setStartPrice(10000);

        like = new LikeRequest();
    }

    private String getAccessToken() throws Exception {
        UserLoginRequest userLogin = new UserLoginRequest();
        userLogin.setUserEmail("ssafy@ssafy.com");
        userLogin.setUserPw("ssafy!@#");

        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                .header("Accept", "application/json")
                .contentType("application/json")
                .content((new JSONObject(oMapper.writeValueAsString(userLogin)).toString())));

        return new JSONObject(result.andReturn().getResponse().getContentAsString()).getString("accessToken");
    }
}
