package com.marketganada.api.contoroller;

import com.marketganada.api.request.AuctionInsertRequest;
import com.marketganada.api.request.PhoneListRequest;
import com.marketganada.api.response.AuctionListResponse;
import com.marketganada.api.response.BaseResponseBody;
import com.marketganada.api.service.AuctionService;
import com.marketganada.api.service.ProductService;
import com.marketganada.common.auth.GanadaUserDetails;
import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.List;

@Api(value = "경매정보 관리 API", tags = {"Auction."})
@RestController
@RequestMapping("/api/auction")
public class AuctionController {
    @Autowired
    AuctionService auctionService;

    @Autowired
    ProductService productService;

    @PostMapping
    @ApiOperation(value = "경매 정보 등록", notes = "DB에 등록할 경매 정보를 입력한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> insertAuction(
            @RequestBody @ApiParam(value = "입력할 경매 정보", required = true) @Valid AuctionInsertRequest auctionInsertRequest,
            @RequestPart(value="auctionImage", required=false) MultipartFile[] auctionImage,
            @ApiIgnore Authentication authentication) {
        // https://ganada.s3.ap-northeast-2.amazonaws.com/

        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        auctionService.insertAuction(auctionInsertRequest, user.getUserId());

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(201,"경매 정보 입력 성공"));
    }

    @GetMapping("/phone")
    @ApiOperation(value = "휴대폰 정보 목록 조회", notes = "DB에 등록된 휴대폰 경매 정보를 리스트업하여 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = AuctionListResponse.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<AuctionListResponse> getPhoneList(
            @RequestParam(value = "brand", defaultValue = "ALL") String brand,
            @RequestParam(value = "model", defaultValue = "ALL") String model,
            @RequestParam(value = "save", defaultValue = "ALL") String save,
            @PageableDefault(size = 12) Pageable pageable
    ) {
        // 스웨거 테스트용 토큰 = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0dHR0QHRlc3QuY29tIiwiaXNzIjoiZ2FuYWRhbWFya2V0LmNvbSIsImV4cCI6MTY1MjQwNzk2MCwiaWF0IjoxNjUyMzIxNTYwfQ.W5OmXXu8v3RJOEICyHQrcugJ8YSmDng6GDAGPN_qmGqwqvsw90kNq1GIh8KoQz1cQQk58UKCuhIUW7Ab9fBykg
        // 스웨거 관리자용 테스트 토큰 = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkB0ZXN0LmNvbSIsImlzcyI6ImdhbmFkYW1hcmtldC5jb20iLCJleHAiOjE2NTI0MDk1NzgsImlhdCI6MTY1MjMyMzE3OH0.mxcTEOV-Je_FnP_JdHxq5Teh__Cz5Fi7nleVg_4Jjt_um04sfk_cfkgFHgS54UPadZCZRDvyakUGcRc2jHXFwA

        List<Auction> auctions;
        auctions = auctionService.getAuctionPhoneList(brand, model, save, pageable);

        return ResponseEntity.ok(AuctionListResponse.of(200,"success",auctions));
    }

    @GetMapping("/earphone")
    @ApiOperation(value = "이어폰 정보 목록 조회", notes = "DB에 등록된 휴대폰 경매 정보를 리스트업하여 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = AuctionListResponse.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<AuctionListResponse> getEarphoneList(
            @RequestParam(value = "brand", defaultValue = "ALL") String brand,
            @RequestParam(value = "model", defaultValue = "ALL") String model,
            @PageableDefault(size = 12) Pageable pageable
    ) {
        List<Auction> auctions;
        auctions = auctionService.getAuctionEarphoneList(brand, model, pageable);

        return ResponseEntity.ok(AuctionListResponse.of(200,"success",auctions));
    }
}
