package com.marketganada.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marketganada.api.request.AddressBookInsertRequest;
import com.marketganada.api.request.UserBankUpdateRequest;
import com.marketganada.api.request.UserNicknameUpdateRequest;
import com.marketganada.api.request.UserPwUpdateRequest;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
public class UserControllerPositiveCases {
    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper objectMapper = new ObjectMapper();

    private static Map<String, String> input;

    private static String accessToken;
    private static MockMultipartFile mFile;
    private static List<MultipartFile> fileList;

    private static Long addressId;

    @BeforeAll
    public static void setup() throws Exception {
        String name = "file";
        String originalFileName = "test.jpg";
        String fileFullPath = ".\\test.jpg";

        mFile = new MockMultipartFile(name, originalFileName, MediaType.IMAGE_JPEG_VALUE, new FileInputStream(fileFullPath));
        fileList = new ArrayList<>();
        fileList.add(mFile);

        input = new HashMap<>();
        input.put("userEmail", "tttt@test.com");
        input.put("userPw", "test123!@#");
    }

    @Test
    @Order(1)
    void loginTest() throws Exception {
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
        accessToken =  new JSONObject(result.andReturn().getResponse().getContentAsString()).getString("token");
    }

    @Test
    @Order(2)
    void getUserDataTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user")
                .header(HttpHeaders.AUTHORIZATION,"Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(3)
    void editNicknameTest() throws Exception {
        UserNicknameUpdateRequest u = new UserNicknameUpdateRequest();
        u.setUserNickname("닉네임 변경 테스트");

        mockMvc.perform(MockMvcRequestBuilders.put("/api/user/nickname")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content((new JSONObject(objectMapper.writeValueAsString(u)).toString())))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(4)
    void editProfileImageTest() throws Exception {
        MockMultipartHttpServletRequestBuilder builder =
                MockMvcRequestBuilders.multipart("/api/user/image");
        builder.with(new RequestPostProcessor() {
            @Override
            public MockHttpServletRequest postProcessRequest(MockHttpServletRequest request) {
                request.setMethod("PUT");
                return request;
            }
        });

        mockMvc.perform(builder
                        .file("profileImage", fileList.get(0).getBytes())
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType(MediaType.MULTIPART_FORM_DATA_VALUE))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(5)
    void editPwTest() throws Exception {
        UserPwUpdateRequest u = new UserPwUpdateRequest();
        u.setCurrentPw(input.get("userPw"));
        u.setNewPw("test");

        mockMvc.perform(MockMvcRequestBuilders.put("/api/user/pw")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content((new JSONObject(objectMapper.writeValueAsString(u)).toString())))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(6)
    void getBankTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/bank")
                        .header(HttpHeaders.AUTHORIZATION,"Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(7)
    void editBankTest() throws Exception {
        UserBankUpdateRequest u = new UserBankUpdateRequest();
        u.setBank("bank");
        u.setBankHolder("기믄준");
        u.setBankNum("11111");

        mockMvc.perform(MockMvcRequestBuilders.put("/api/user/bank")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content((new JSONObject(objectMapper.writeValueAsString(u)).toString())))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(8)
    void insertAddressTest() throws Exception {
        AddressBookInsertRequest a = new AddressBookInsertRequest();
        a.setAddress("address");
        a.setAddressDetail("address detail");
        a.setAddressName("name");
        a.setAddressPhone("01000000000");
        a.setPostalCode("postal");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/addressbook")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content((new JSONObject(objectMapper.writeValueAsString(a)).toString())))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(9)
    void getAddressTest() throws Exception {
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.get("/api/user/addressbook")
                        .header(HttpHeaders.AUTHORIZATION,"Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());

        JSONObject tmp = new JSONObject(result.andReturn().getResponse().getContentAsString());
        JSONArray resultArray = tmp.getJSONArray("addressBookList");
        tmp = resultArray.getJSONObject(0);

        addressId = tmp.getLong("addressId");
    }

    @Test
    @Order(10)
    void editAddressTest() throws Exception {
        AddressBookInsertRequest a = new AddressBookInsertRequest();
        a.setAddress("address");
        a.setAddressDetail("address detail");
        a.setAddressName("name");
        a.setAddressPhone("01000000000");
        a.setPostalCode("postal");

        mockMvc.perform(MockMvcRequestBuilders.put("/api/user/addressbook/"+addressId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content((new JSONObject(objectMapper.writeValueAsString(a)).toString())))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(11)
    void editRepresentTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/user/represent/"+addressId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(12)
    void deleteAddressTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/user/addressbook/"+addressId)
                        .header(HttpHeaders.AUTHORIZATION,"Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(13)
    void getLikedTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/likelist")
                        .header(HttpHeaders.AUTHORIZATION,"Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(14)
    void getSalesTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/sales-history")
                        .header(HttpHeaders.AUTHORIZATION,"Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(15)
    void getOrderTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/order-history")
                        .header(HttpHeaders.AUTHORIZATION,"Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(16)
    void pwRestore() throws Exception {
        UserPwUpdateRequest u = new UserPwUpdateRequest();
        u.setCurrentPw("test");
        u.setNewPw(input.get("userPw"));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/user/pw")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content((new JSONObject(objectMapper.writeValueAsString(u)).toString())))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(17)
    void nicknameRestore() throws Exception {
        UserNicknameUpdateRequest u = new UserNicknameUpdateRequest();
        u.setUserNickname("테스트유저");

        mockMvc.perform(MockMvcRequestBuilders.put("/api/user/nickname")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content((new JSONObject(objectMapper.writeValueAsString(u)).toString())))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andDo(MockMvcResultHandlers.print());
    }
}
