package com.marketganada.producttest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marketganada.api.request.*;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import javax.transaction.Transactional;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ProductControllerJwtErrorCases {
    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper oMapper = new ObjectMapper();
    Logger logger = LoggerFactory.getLogger(ProductControllerPositiveCases.class);
    private String accessToken;

    private static ProductInsertRequest product;
    private static CategoryLargeInsertRequest categoryLarge;
    private static CategoryMiddleInsertRequest categoryMiddle;
    private static CategorySmallInsertRequest categorySmall;

    private static int productId = -1;

    @BeforeAll
    public static void setup() {

        categoryLarge = new CategoryLargeInsertRequest();

        categoryMiddle = new CategoryMiddleInsertRequest();

        categorySmall = new CategorySmallInsertRequest();

        product = new ProductInsertRequest();
    }

    @Test
    @Order(0)
    void settingWrongAccessToken() {
        accessToken = "dummy";
    }

    @Test
    @Order(1)
    void insertCategoryLargeTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/product/category-large")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json")
                        .content((new JSONObject(oMapper.writeValueAsString(categoryLarge)).toString())))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(2)
    void getCategoryLargeListTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/product/category-large-list")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(3)
    void insertCategoryMiddleTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/product/category-middle")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json")
                        .content((new JSONObject(oMapper.writeValueAsString(categoryMiddle)).toString())))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(4)
    void getCategoryMiddleListTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/product/category-middle-list")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(5)
    void insertCategorySmallTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/product/category-small")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json")
                        .content((new JSONObject(oMapper.writeValueAsString(categorySmall)).toString())))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(6)
    void getCategorySmallListTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/product/category-small-list")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(7)
    void insertProductTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/product")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json")
                        .content((new JSONObject(oMapper.writeValueAsString(product)).toString())))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(8)
    void getProductListTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/product/product-list")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(9)
    void editProductTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/product/"+productId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json")
                        .content((new JSONObject(oMapper.writeValueAsString(product)).toString())))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(10)
    void editCategoryLargeTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/product/category-large/-1")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json")
                        .content((new JSONObject(oMapper.writeValueAsString(categoryLarge)).toString())))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(11)
    void editCategoryMiddleTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/product/category-middle/-1")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json")
                        .content((new JSONObject(oMapper.writeValueAsString(categoryMiddle)).toString())))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(12)
    void editCategorySmallTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/product/category-small/-1")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json")
                        .content((new JSONObject(oMapper.writeValueAsString(categorySmall)).toString())))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(13)
    void getProductTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/product/"+productId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(14)
    void deleteProductTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/product/"+productId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(15)
    void deleteCategoryLargeTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/product/category-large/-1")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(16)
    void deleteCategoryMiddleTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/product/category-middle/-1")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @Order(17)
    void deleteCategorySmallTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/product/category-small/-1")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print());
    }
}
