package com.marketganada.api.contoroller;

import com.marketganada.api.request.CategoryLargeInsertRequest;
import com.marketganada.api.request.CategoryMiddleInsertRequest;
import com.marketganada.api.request.CategorySmallInsertRequest;
import com.marketganada.api.request.ProductInsertRequest;
import com.marketganada.api.response.*;
import com.marketganada.api.service.ProductService;
import com.marketganada.db.entity.CategoryMiddle;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Api(value = "상품정보 관리 API", tags = {"Product."})
@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    ProductService productService;

    @PostMapping
    @ApiOperation(value = "제품 정보 등록", notes = "DB에 등록할 제품 정보로 <strong>제품명/브랜드명/출시일자/출고가/모델명/설명/대분류/중분류/소분류</strong>를 입력한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> productInsert(@RequestBody @ApiParam(value = "입력할 제품 정보", required = true) @Valid ProductInsertRequest productInsertRequest) {
        String result = productService.insertProductInfo(productInsertRequest);

        if(result.equals("Category Error")) {
            return ResponseEntity.badRequest().body(BaseResponseBody.of(400,"입력한 카테고리가 존재하지 않습니다."));
        }

        else if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(201,"제품 정보 입력 성공"));
    }

    @PutMapping("/{productId}")
    @ApiOperation(value = "제품 정보 수정", notes = "DB에 등록된 제품 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> productUpdate(@RequestBody @ApiParam(value = "수정할 제품 정보", required = true) @Valid ProductInsertRequest productInsertRequest,
                                                          @PathVariable Long productId) {
        String result;

        try {
            result = productService.updateProduct(productInsertRequest, productId);
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(BaseResponseBody.of(404,"해당 ID의 제품이 존재하지 않습니다."));
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));
            }
        }

        if(result.equals("Category Error")) {
            return ResponseEntity.badRequest().body(BaseResponseBody.of(400,"입력한 카테고리가 존재하지 않습니다."));
        }
        else if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(201,result));
    }

    @DeleteMapping("/{productId}")
    @ApiOperation(value = "제품 정보 삭제", notes = "선택된 <strong>제품 ID</strong>의 제품 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> productDelete(@PathVariable Long productId) {
        String result;
        try {
            result = productService.deleteProductById(productId);
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(BaseResponseBody.of(404,"해당 ID의 제품이 존재하지 않습니다."));
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));
            }
        }

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));

        return ResponseEntity.ok(BaseResponseBody.of(200,result));
    }

    @PostMapping("/category-large")
    @ApiOperation(value = "대분류 정보 등록", notes = "DB에 등록할 대분류 정보로 <strong>대분류명</strong>를 입력한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> categoryLargeInsert(
            @RequestBody @ApiParam(value = "입력할 대분류 정보", required = true) @Valid CategoryLargeInsertRequest categoryLargeInsertRequest
    ) {
        String result = productService.insertCategoryLarge(categoryLargeInsertRequest);

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(201,result));
    }

    @PutMapping("/category-large/{categoryLargeId}")
    @ApiOperation(value = "대분류 정보 수정", notes = "DB에 등록된 대분류 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> categoryLargeUpdate(
            @RequestBody @ApiParam(value = "수정할 대분류 정보", required = true) @Valid CategoryLargeInsertRequest categoryLargeInsertRequest,
            @PathVariable Long categoryLargeId
    ) {
        String result;

        try {
            result = productService.updateCategoryLarge(categoryLargeInsertRequest, categoryLargeId);
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(BaseResponseBody.of(404,"해당 ID의 제품이 존재하지 않습니다."));
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));
            }
        }

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(201,result));
    }

    @DeleteMapping("/category-large/{categoryLargeId}")
    @ApiOperation(value = "대분류 정보 삭제", notes = "선택된 <strong>대분류 ID</strong>의 제품 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> categoryLargeDelete(@PathVariable Long categoryLargeId) {
        String result;
        try {
            result = productService.deleteCategoryLarge(categoryLargeId);
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(BaseResponseBody.of(404,"해당 ID의 대분류가 존재하지 않습니다."));
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));
            }
        }

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));

        return ResponseEntity.ok(BaseResponseBody.of(200,"success"));
    }

    @PostMapping("/category-middle")
    @ApiOperation(value = "중분류 정보 등록", notes = "DB에 등록할 중분류 정보로 <strong>중분류명</strong>를 입력한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> categoryMiddleInsert(
            @RequestBody @ApiParam(value = "입력할 중분류 정보", required = true) @Valid CategoryMiddleInsertRequest categoryMiddleInsertRequest
    ) {
        String result = productService.insertCategoryMiddle(categoryMiddleInsertRequest);

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(201,result));
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

        return ResponseEntity.ok(CategoryMiddleListResponse.of(200,"success",categoryMiddles));
    }

    @PutMapping("/category-middle/{categoryMiddleId}")
    @ApiOperation(value = "중분류 정보 수정", notes = "DB에 등록된 중분류 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> categoryMiddleUpdate(
            @RequestBody @ApiParam(value = "수정할 중분류 정보", required = true) @Valid CategoryMiddleInsertRequest categoryMiddleInsertRequest,
            @PathVariable Long categoryMiddleId
    ) {
        String result;

        try {
            result = productService.updateCategoryMiddle(categoryMiddleInsertRequest, categoryMiddleId);
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(BaseResponseBody.of(404,"해당 ID의 제품이 존재하지 않습니다."));
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));
            }
        }

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(201,result));
    }

    @DeleteMapping("/category-middle/{categoryMiddleId}")
    @ApiOperation(value = "중분류 정보 삭제", notes = "선택된 <strong>중분류 ID</strong>의 제품 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> categoryMiddleDelete(@PathVariable Long categoryMiddleId) {
        String result;
        try {
            result = productService.deleteCategoryMiddle(categoryMiddleId);
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(BaseResponseBody.of(404,"해당 ID의 대분류가 존재하지 않습니다."));
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));
            }
        }

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));

        return ResponseEntity.ok(BaseResponseBody.of(200,"success"));
    }

    @PostMapping("/category-small")
    @ApiOperation(value = "소분류 정보 등록", notes = "DB에 등록할 소분류 정보로 <strong>소분류명</strong>를 입력한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> categorySmallInsert(
            @RequestBody @ApiParam(value = "입력할 소분류 정보", required = true) @Valid CategorySmallInsertRequest categorySmallInsertRequest
    ) {
        String result = productService.insertCategorySmall(categorySmallInsertRequest);

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(201,result));
    }

    @PutMapping("/category-small/{categorySmallId}")
    @ApiOperation(value = "소분류 정보 수정", notes = "DB에 등록된 소분류 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> categorySmallUpdate(
            @RequestBody @ApiParam(value = "수정할 소분류 정보", required = true) @Valid CategorySmallInsertRequest categorySmallInsertRequest,
            @PathVariable Long categorySmallId
    ) {
        String result;

        try {
            result = productService.updateCategorySmall(categorySmallInsertRequest, categorySmallId);
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(BaseResponseBody.of(404,"해당 ID의 제품이 존재하지 않습니다."));
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));
            }
        }

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(201,result));
    }

    @DeleteMapping("/category-small/{categorySmallId}")
    @ApiOperation(value = "소분류 정보 삭제", notes = "선택된 <strong>소분류 ID</strong>의 제품 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> categorySmallDelete(@PathVariable Long categorySmallId) {
        String result;
        try {
            result = productService.deleteCategorySmall(categorySmallId);
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(BaseResponseBody.of(404,"해당 ID의 대분류가 존재하지 않습니다."));
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));
            }
        }

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));

        return ResponseEntity.ok(BaseResponseBody.of(200,"success"));
    }
}
