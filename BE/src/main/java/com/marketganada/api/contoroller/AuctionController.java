package com.marketganada.api.contoroller;

import com.marketganada.api.request.AuctionInsertRequest;
import com.marketganada.api.request.ProductInsertRequest;
import com.marketganada.api.response.AuctionDetailResponse;
import com.marketganada.api.response.AuctionListResponse;
import com.marketganada.api.response.BaseResponseBody;
import com.marketganada.api.service.AuctionService;
import com.marketganada.api.service.ProductService;
import com.marketganada.config.auth.GanadaUserDetails;
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

    @GetMapping("/{auctionId}")
    @ApiOperation(value = "경매 정보 상세 조회", notes = "DB에 등록된 경매 정보를 <strong>경매 ID</strong>로 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = AuctionDetailResponse.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<AuctionDetailResponse> getAuctionById(@PathVariable Long auctionId) {
        Auction auction;
        try {
            auction = auctionService.getAuctionById(auctionId);
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(AuctionDetailResponse.of(404,"해당 ID의 경매가 존재하지 않습니다.",null));
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(AuctionDetailResponse.of(500,"내부 서버 오류",null));
            }
        }

        return ResponseEntity.ok(AuctionDetailResponse.of(200,"success",auction));
    }

    @DeleteMapping("/{auctionId}")
    @ApiOperation(value = "경매 정보 삭제", notes = "선택된 <strong>경매 ID</strong>의 제품 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> deleteAuctionById(
            @PathVariable Long auctionId,
            @ApiIgnore Authentication authentication
    ) {
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        String result;
        try {
            result = auctionService.deleteAuction(auctionId, user.getUserId());

            if(result.equals("not owner"))
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(BaseResponseBody.of(403,"해당 경매의 소유자가 아닙니다."));
            else if(!result.equals("success"))
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(BaseResponseBody.of(404,"해당 ID의 경매 또는 유저가 존재하지 않습니다."));
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));
            }
        }


        return ResponseEntity.ok(BaseResponseBody.of(200,result));
    }

    @PostMapping("/like")
    @ApiOperation(value = "경매 좋아요 등록", notes = "현재 로그인 유저로 <strong>경매 ID</strong>를 받아서 좋아요를 입력한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 409, message = "이미 좋아요를 찍은 유저"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> insertAuctionLike(
            @RequestBody @ApiParam(value = "좋아요를 찍을 경매 ID", required = true) @Valid Long auctionId,
            @ApiIgnore Authentication authentication
    ) {
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        String result;
        try {
            result = auctionService.insertAuctionLike(auctionId,user.getUserId());
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(BaseResponseBody.of(404,"해당 ID의 경매 또는 유저가 존재하지 않습니다."));
            }
            else if(e.getMessage().equals("already liked")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(BaseResponseBody.of(409,"이미 좋아요를 입력한 ID입니다."));
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));
            }
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(201,result));
    }

    @DeleteMapping("/like/{auctionId}")
    @ApiOperation(value = "경매 좋아요 삭제", notes = "현재 로그인된 유저의 해당 <strong>경매 ID</strong>의 경매 좋아요를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "아직 좋아요를 찍지 않은 유저"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> deleteAuctionLike(
            @PathVariable Long auctionId,
            @ApiIgnore Authentication authentication
    ) {
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        String result;
        try {
            result = auctionService.deleteAuctionLike(auctionId, user.getUserId());
        } catch (Exception e) {
            if(e.getMessage().equals("not liked")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(BaseResponseBody.of(400,"아직 좋아요를 입력하지 않은 ID입니다."));
            }
            else if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(BaseResponseBody.of(404,"해당 ID의 유저 또는 경매가 없습니다."));
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(BaseResponseBody.of(500,"내부 서버 오류"));
            }
        }


        return ResponseEntity.ok(BaseResponseBody.of(200,result));
    }
}
