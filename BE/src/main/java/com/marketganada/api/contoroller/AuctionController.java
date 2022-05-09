package com.marketganada.api.contoroller;

import com.marketganada.api.request.AuctionInsertRequest;
import com.marketganada.api.response.BaseResponseBody;
import com.marketganada.api.service.AuctionService;
import com.marketganada.api.service.ProductService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Api(value = "경매정보 관리 API", tags = {"Auction."})
@RestController
@RequestMapping("/api/auction")
public class AuctionController {
    @Autowired
    AuctionService auctionService;

    @Autowired
    ProductService productService;

    @PostMapping
    @ApiOperation(value = "경매 정보 등록", notes = "DB에 등록할 경매 정보로 <strong>제품명/브랜드명/출시일자/출고가/모델명/설명/대분류/중분류/소분류</strong>를 입력한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> insertAuction(@RequestBody @ApiParam(value = "입력할 경매 정보", required = true) @Valid AuctionInsertRequest auctionInsertRequest) {
        
        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(201,"제품 정보 입력 성공"));
    }
}
