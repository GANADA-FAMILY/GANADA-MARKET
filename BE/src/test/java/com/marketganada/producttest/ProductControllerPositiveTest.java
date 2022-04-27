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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import javax.transaction.Transactional;
import java.util.Date;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ProductControllerPositiveTest {
    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper oMapper = new ObjectMapper();
    Logger logger = LoggerFactory.getLogger(ProductControllerPositiveTest.class);
    private String accessToken;

	private static ProductInsertRequest product;
	private static CategoryLargeInsertRequest categoryLarge;
	private static CategoryMiddleInsertRequest categoryMiddle;
	private static CategorySmallInsertRequest categorySmall;

	private static int productId;

	@BeforeAll
	public static void setup() throws Exception {

		categoryLarge = new CategoryLargeInsertRequest();
		categoryLarge.setCategoryName("sample large");

		categoryMiddle = new CategoryMiddleInsertRequest();
		categoryMiddle.setCategoryName("sample middle");

		categorySmall = new CategorySmallInsertRequest();
		categorySmall.setCategoryName("sample small");

		product = new ProductInsertRequest();
		product.setProductName("sample name");
		product.setProductBrand("sample brand");
		product.setDescription("sample description");
		product.setDeviceId("sample device id");
		product.setReleaseDate(new Date());
		product.setReleasePrice(10000);
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
	void insertCategoryLargeTest() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/api/product/category-large")
			.header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
			.contentType("application/json")
			.content((new JSONObject(oMapper.writeValueAsString(categoryLarge)).toString())))
			.andExpect(MockMvcResultMatchers.status().isCreated())
			.andDo(MockMvcResultHandlers.print());
	}

	@Test
	@Order(2)
	void getCategoryLargeListTest() throws Exception {
		ResultActions result = mockMvc.perform(MockMvcRequestBuilders.get("/api/product/category-large-list")
						.header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andDo(MockMvcResultHandlers.print());

		JSONObject tmp = new JSONObject(result.andReturn().getResponse().getContentAsString());
		JSONArray resultArray = tmp.getJSONArray("categoryLargeList");
		tmp = resultArray.getJSONObject(resultArray.length()-1);

		categoryMiddle.setCategoryLargeId(tmp.getInt("categoryLargeId"));
		product.setCategoryLarge(categoryMiddle.getCategoryLargeId());
	}

	@Test
	@Order(3)
	void insertCategoryMiddleTest() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/api/product/category-middle")
						.header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
						.contentType("application/json")
						.content((new JSONObject(oMapper.writeValueAsString(categoryMiddle)).toString())))
				.andExpect(MockMvcResultMatchers.status().isCreated())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	@Order(4)
	void getCategoryMiddleListTest() throws Exception {
		ResultActions result = mockMvc.perform(MockMvcRequestBuilders.get("/api/product/category-middle-list")
						.header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andDo(MockMvcResultHandlers.print());

		JSONObject tmp = new JSONObject(result.andReturn().getResponse().getContentAsString());
		JSONArray resultArray = tmp.getJSONArray("categoryMiddleList");
		tmp = resultArray.getJSONObject(resultArray.length()-1);

		categorySmall.setCategoryMiddleId(tmp.getInt("categoryMiddleId"));
		product.setCategoryMiddle(categorySmall.getCategoryMiddleId());
	}

	@Test
	@Order(5)
	void insertCategorySmallTest() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/api/product/category-small")
						.header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
						.contentType("application/json")
						.content((new JSONObject(oMapper.writeValueAsString(categorySmall)).toString())))
				.andExpect(MockMvcResultMatchers.status().isCreated())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	@Order(6)
	void getCategorySmallListTest() throws Exception {
		ResultActions result = mockMvc.perform(MockMvcRequestBuilders.get("/api/product/category-small-list")
						.header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andDo(MockMvcResultHandlers.print());

		JSONObject tmp = new JSONObject(result.andReturn().getResponse().getContentAsString());
		JSONArray resultArray = tmp.getJSONArray("categorySmallList");
		tmp = resultArray.getJSONObject(resultArray.length()-1);

		product.setCategorySmall(tmp.getInt("categorySmallId"));
	}

	@Test
	@Order(7)
	void insertProductTest() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/api/product")
						.header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
						.contentType("application/json")
						.content((new JSONObject(oMapper.writeValueAsString(product)).toString())))
				.andExpect(MockMvcResultMatchers.status().isCreated())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	@Order(8)
	void getProductListTest() throws Exception {
		ResultActions result = mockMvc.perform(MockMvcRequestBuilders.get("/api/product/product-list")
						.header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andDo(MockMvcResultHandlers.print());

		JSONObject tmp = new JSONObject(result.andReturn().getResponse().getContentAsString());
		JSONArray resultArray = tmp.getJSONArray("productList");
		tmp = resultArray.getJSONObject(resultArray.length()-1);

		productId = tmp.getInt("productId");
	}

	@Test
	@Order(9)
	void editProductTest() throws Exception {
		product.setProductName("edit name");

		mockMvc.perform(MockMvcRequestBuilders.put("/api/product/"+productId)
						.header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
						.contentType("application/json")
						.content((new JSONObject(oMapper.writeValueAsString(product)).toString())))
				.andExpect(MockMvcResultMatchers.status().isCreated())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	@Order(10)
	void editCategoryLargeTest() throws Exception {
		categoryLarge.setCategoryName("edit large");

		mockMvc.perform(MockMvcRequestBuilders.put("/api/product/category-large/"+product.getCategoryLarge())
						.header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
						.contentType("application/json")
						.content((new JSONObject(oMapper.writeValueAsString(categoryLarge)).toString())))
				.andExpect(MockMvcResultMatchers.status().isCreated())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	@Order(11)
	void editCategoryMiddleTest() throws Exception {
		categoryMiddle.setCategoryName("edit middle");

		mockMvc.perform(MockMvcRequestBuilders.put("/api/product/category-middle/"+product.getCategoryMiddle())
						.header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
						.contentType("application/json")
						.content((new JSONObject(oMapper.writeValueAsString(categoryMiddle)).toString())))
				.andExpect(MockMvcResultMatchers.status().isCreated())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	@Order(12)
	void editCategorySmallTest() throws Exception {
		categorySmall.setCategoryName("edit small");

		mockMvc.perform(MockMvcRequestBuilders.put("/api/product/category-small/"+product.getCategorySmall())
						.header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
						.contentType("application/json")
						.content((new JSONObject(oMapper.writeValueAsString(categorySmall)).toString())))
				.andExpect(MockMvcResultMatchers.status().isCreated())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	@Order(13)
	void getProductTest() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/product/"+productId)
						.header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	@Order(14)
	void deleteProductTest() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.delete("/api/product/"+productId)
						.header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
						.contentType("application/json"))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	@Order(15)
	void deleteCategoryLargeTest() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.delete("/api/product/category-large/"+product.getCategoryLarge())
						.header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
						.contentType("application/json"))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	@Order(16)
	void deleteCategoryMiddleTest() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.delete("/api/product/category-middle/"+product.getCategoryMiddle())
						.header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
						.contentType("application/json"))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	@Order(17)
	void deleteCategorySmallTest() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.delete("/api/product/category-small/"+product.getCategorySmall())
						.header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
						.contentType("application/json"))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andDo(MockMvcResultHandlers.print());
	}
}
