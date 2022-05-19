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
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity productInsert(@RequestBody @ApiParam(value = "입력할 제품 정보", required = true) @Valid ProductInsertRequest productInsertRequest) {
        String result = productService.insertProductInfo(productInsertRequest);

        if(result.equals("Category Error")) {
            return ResponseEntity.badRequest().build();
        }

        else if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{productId}")
    @ApiOperation(value = "제품 정보 수정", notes = "DB에 등록된 제품 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity productUpdate(@RequestBody @ApiParam(value = "수정할 제품 정보", required = true) @Valid ProductInsertRequest productInsertRequest,
                                                          @PathVariable Long productId) {
        String result;

        try {
            result = productService.updateProduct(productInsertRequest, productId);
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        if(result.equals("Category Error")) {
            return ResponseEntity.badRequest().build();
        }
        else if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{productId}")
    @ApiOperation(value = "제품 정보 삭제", notes = "선택된 <strong>제품 ID</strong>의 제품 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity productDelete(@PathVariable Long productId) {
        String result;
        try {
            result = productService.deleteProductById(productId);
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        return ResponseEntity.ok().build();
    }

    @PostMapping("/category-large")
    @ApiOperation(value = "대분류 정보 등록", notes = "DB에 등록할 대분류 정보로 <strong>대분류명</strong>를 입력한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity categoryLargeInsert(
            @RequestBody @ApiParam(value = "입력할 대분류 정보", required = true) @Valid CategoryLargeInsertRequest categoryLargeInsertRequest
    ) {
        String result = productService.insertCategoryLarge(categoryLargeInsertRequest);

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/category-large/{categoryLargeId}")
    @ApiOperation(value = "대분류 정보 수정", notes = "DB에 등록된 대분류 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity categoryLargeUpdate(
            @RequestBody @ApiParam(value = "수정할 대분류 정보", required = true) @Valid CategoryLargeInsertRequest categoryLargeInsertRequest,
            @PathVariable Long categoryLargeId
    ) {
        String result;

        try {
            result = productService.updateCategoryLarge(categoryLargeInsertRequest, categoryLargeId);
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/category-large/{categoryLargeId}")
    @ApiOperation(value = "대분류 정보 삭제", notes = "선택된 <strong>대분류 ID</strong>의 제품 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
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
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        return ResponseEntity.ok().build();
    }

    @PostMapping("/category-middle")
    @ApiOperation(value = "중분류 정보 등록", notes = "DB에 등록할 중분류 정보로 <strong>중분류명</strong>를 입력한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity categoryMiddleInsert(
            @RequestBody @ApiParam(value = "입력할 중분류 정보", required = true) @Valid CategoryMiddleInsertRequest categoryMiddleInsertRequest
    ) {
        String result = productService.insertCategoryMiddle(categoryMiddleInsertRequest);

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/category-middle/{categoryMiddleId}")
    @ApiOperation(value = "중분류 정보 수정", notes = "DB에 등록된 중분류 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity categoryMiddleUpdate(
            @RequestBody @ApiParam(value = "수정할 중분류 정보", required = true) @Valid CategoryMiddleInsertRequest categoryMiddleInsertRequest,
            @PathVariable Long categoryMiddleId
    ) {
        String result;

        try {
            result = productService.updateCategoryMiddle(categoryMiddleInsertRequest, categoryMiddleId);
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/category-middle/{categoryMiddleId}")
    @ApiOperation(value = "중분류 정보 삭제", notes = "선택된 <strong>중분류 ID</strong>의 제품 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity categoryMiddleDelete(@PathVariable Long categoryMiddleId) {
        String result;
        try {
            result = productService.deleteCategoryMiddle(categoryMiddleId);
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        return ResponseEntity.ok().build();
    }

    @PostMapping("/category-small")
    @ApiOperation(value = "소분류 정보 등록", notes = "DB에 등록할 소분류 정보로 <strong>소분류명</strong>를 입력한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity categorySmallInsert(
            @RequestBody @ApiParam(value = "입력할 소분류 정보", required = true) @Valid CategorySmallInsertRequest categorySmallInsertRequest
    ) {
        String result = productService.insertCategorySmall(categorySmallInsertRequest);

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/category-small/{categorySmallId}")
    @ApiOperation(value = "소분류 정보 수정", notes = "DB에 등록된 소분류 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity categorySmallUpdate(
            @RequestBody @ApiParam(value = "수정할 소분류 정보", required = true) @Valid CategorySmallInsertRequest categorySmallInsertRequest,
            @PathVariable Long categorySmallId
    ) {
        String result;

        try {
            result = productService.updateCategorySmall(categorySmallInsertRequest, categorySmallId);
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/category-small/{categorySmallId}")
    @ApiOperation(value = "소분류 정보 삭제", notes = "선택된 <strong>소분류 ID</strong>의 제품 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity categorySmallDelete(@PathVariable Long categorySmallId) {
        String result;
        try {
            result = productService.deleteCategorySmall(categorySmallId);
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        if(!result.equals("success"))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        return ResponseEntity.ok().build();
    }
}
