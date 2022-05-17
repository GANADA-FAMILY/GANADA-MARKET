package com.marketganada.api.contoroller;

import com.marketganada.api.response.*;
import com.marketganada.api.service.ProductService;
import com.marketganada.db.entity.CategoryLarge;
import com.marketganada.db.entity.CategoryMiddle;
import com.marketganada.db.entity.CategorySmall;
import com.marketganada.db.entity.Product;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value = "상품정보 조회 API", tags = {"ProductGet."})
@RestController
@RequestMapping("/api/product-get")
public class ProductGetController {
    @Autowired
    ProductService productService;

    @GetMapping
    @ApiOperation(value = "제품 정보 목록 조회", notes = "DB에 등록된 제품 정보를 리스트업하여 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = ProductListResponse.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<ProductListResponse> getProductList() {
        List<Product> products;
        products = productService.getProductList();

        return ResponseEntity.ok(ProductListResponse.from(products));
    }

    @GetMapping("/{productId}")
    @ApiOperation(value = "제품 정보 상세 조회", notes = "DB에 등록된 제품 정보를 <strong>제품 ID</strong>로 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = ProductDetailResponse.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<ProductDetailResponse> getProductById(@PathVariable Long productId) {
        Product product;
        try {
            product = productService.getProductById(productId);
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        return ResponseEntity.ok(ProductDetailResponse.from(product));
    }

    @GetMapping("/category-large/{categoryLargeId}")
    @ApiOperation(value = "대분류 정보 상세 조회", notes = "대분류명 및 해당 대분류에 종속된 하위 분류를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = CategoryLargeResponse.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<CategoryLargeResponse> getCategoryLargeById(@PathVariable Long categoryLargeId) {
        CategoryLarge categoryLarge;
        try {
            categoryLarge = productService.getCategoryLargeById(categoryLargeId);
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/category-large-list")
    @ApiOperation(value = "대분류 목록 조회", notes = "DB에 등록된 대분류 정보를 리스트업하여 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = CategoryLargeListResponse.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<CategoryLargeListResponse> getCategoryLargeList() {
        List<CategoryLarge> categoryLarges;
        categoryLarges = productService.getCategoryLargeList();

        return ResponseEntity.ok(CategoryLargeListResponse.from(categoryLarges));
    }

    @GetMapping("/category-middle-list")
    @ApiOperation(value = "중분류 목록 조회", notes = "DB에 등록된 중분류 정보를 리스트업하여 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = CategoryMiddleListResponse.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<CategoryMiddleListResponse> getCategoryMiddleList() {
        List<CategoryMiddle> categoryMiddles;
        categoryMiddles = productService.getCategoryMiddleList();

        return ResponseEntity.ok(CategoryMiddleListResponse.from(categoryMiddles));
    }

    @GetMapping("/category-small-list")
    @ApiOperation(value = "소분류 목록 조회", notes = "DB에 등록된 소분류 정보를 리스트업하여 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = CategorySmallListResponse.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<CategorySmallListResponse> getCategorySmallList() {
        List<CategorySmall> categorySmalls;
        categorySmalls = productService.getCategorySmallList();

        return ResponseEntity.ok(CategorySmallListResponse.from(categorySmalls));
    }
}
