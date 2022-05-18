package com.marketganada.api.contoroller;

import com.marketganada.api.request.AuctionInsertRequest;
import com.marketganada.api.request.LikeRequest;
import com.marketganada.api.response.AuctionDetailResponse;
import com.marketganada.api.response.AuctionListResponse;
import com.marketganada.api.response.BaseResponseBody;
import com.marketganada.api.service.AuctionService;
import com.marketganada.api.service.ProductService;
import com.marketganada.api.service.S3Service;
import com.marketganada.config.auth.GanadaUserDetails;
import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Api(value = "경매정보 관리 API", tags = {"Auction."})
@RestController
@RequestMapping("/api/auction")
public class AuctionController {
    @Autowired
    AuctionService auctionService;

    @Autowired
    ProductService productService;

    @Autowired
    S3Service s3Service;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation(value = "경매 정보 등록", notes = "DB에 등록할 경매 정보를 입력한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity insertAuction(
            @ModelAttribute @ApiParam(value = "입력할 경매 정보", required = true) @Valid AuctionInsertRequest auctionInsertRequest,
            @RequestPart(value = "auctionImages", required = false) List<MultipartFile> auctionImages,
            @ApiIgnore Authentication authentication) {
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        try {
            auctionService.insertAuction(auctionInsertRequest, auctionImages, user.getUserId());
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatus()).build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/recent")
    @ApiOperation(value = "최근 경매 목록 조회", notes = "DB에 등록된 최근 경매 정보를 리스트업하여 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = AuctionListResponse.class),
            @ApiResponse(code = 400, message = "잘못된 요청"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<AuctionListResponse> getRecentList(
            @PageableDefault(size = 16, sort = "auctionId", direction = Sort.Direction.DESC) Pageable pageable,
            @ApiIgnore Authentication authentication
    ) {
        User user = null;
        if(authentication != null) {
            GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
            user = userDetails.getUser();
        }

        Page<Auction> auctions;
        List<Boolean> isLikes = new ArrayList<>();

        try {
            auctions = auctionService.getRecentAuctionList(pageable);

            if(user != null) {
                for (Auction a : auctions) {
                    if (auctionService.isThisAuctionLiked(a, user.getUserId()))
                        isLikes.add(true);
                    else
                        isLikes.add(false);
                }
            }
        } catch (Exception e) {
            if(e.getMessage().equals("products not found"))
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(AuctionListResponse.of(null,null,null));
            else
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(AuctionListResponse.of(null,null,null));
        }

        Long auctionCnt = auctionService.getAuctionCnt("ALL","ALL","ALL","ALL");

        return ResponseEntity.ok(AuctionListResponse.of(auctions.toList(),isLikes,auctionCnt));
    }

    @GetMapping("/phone")
    @ApiOperation(value = "휴대폰 정보 목록 조회", notes = "DB에 등록된 휴대폰 경매 정보를 리스트업하여 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = AuctionListResponse.class),
            @ApiResponse(code = 400, message = "잘못된 요청"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<AuctionListResponse> getPhoneList(
            @RequestParam(value = "brand", defaultValue = "ALL") String brand,
            @RequestParam(value = "model", defaultValue = "ALL") String model,
            @RequestParam(value = "save", defaultValue = "ALL") String save,
            @PageableDefault(size = 16, sort = "endTime", direction = Sort.Direction.DESC) Pageable pageable,
            @ApiIgnore Authentication authentication
    ) {
        User user = null;
        if(authentication != null) {
            GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
            user = userDetails.getUser();
        }

        List<Auction> auctions;
        List<Boolean> isLikes = new ArrayList<>();

        try {
            auctions = auctionService.getAuctionPhoneList(brand, model, save, pageable);

            if(user != null) {
                for (Auction a : auctions) {
                    if (auctionService.isThisAuctionLiked(a, user.getUserId()))
                        isLikes.add(true);
                    else
                        isLikes.add(false);
                }
            }
        } catch (Exception e) {
            if(e.getMessage().equals("products not found"))
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(AuctionListResponse.of(null,null, null));
            else {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(AuctionListResponse.of(null, null, null));
            }
        }

        Long auctionCnt = auctionService.getAuctionCnt("스마트폰",brand,model,save);

        return ResponseEntity.ok(AuctionListResponse.of(auctions,isLikes,auctionCnt));
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
            @PageableDefault(size = 16, sort = "endTime", direction = Sort.Direction.DESC) Pageable pageable,
            @ApiIgnore Authentication authentication
    ) {
        User user = null;
        if(authentication != null) {
            GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
            user = userDetails.getUser();
        }

        List<Auction> auctions;
        List<Boolean> isLikes = new ArrayList<>();

        try {
            auctions = auctionService.getAuctionEarphoneList(brand, model, pageable);

            if(user != null) {
                for (Auction a : auctions) {
                    if (auctionService.isThisAuctionLiked(a, user.getUserId()))
                        isLikes.add(true);
                    else
                        isLikes.add(false);
                }
            }
        } catch (Exception e) {
            if(e.getMessage().equals("products not found"))
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(AuctionListResponse.of(null,null,null));
            else
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(AuctionListResponse.of(null,null,null));
        }

        Long auctionCnt = auctionService.getAuctionCnt("이어폰",brand,model,"ALL");

        return ResponseEntity.ok(AuctionListResponse.of(auctions,isLikes,auctionCnt));
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
    public ResponseEntity<AuctionDetailResponse> getAuctionById(
            @PathVariable Long auctionId,
            @ApiIgnore Authentication authentication
    ) {
        User user = null;
        if(authentication != null) {
            GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
            user = userDetails.getUser();
        }

        Auction auction;
        boolean isLiked = false,isMine = false;

        try {
            auction = auctionService.getAuctionById(auctionId);

            if(user != null) {
                isLiked = auctionService.isThisAuctionLiked(auction, user.getUserId());
                isMine = auctionService.isThisAuctionMine(auction, user.getUserId());
            }
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        return ResponseEntity.ok(AuctionDetailResponse.of(auction,isLiked,isMine));
    }

    @DeleteMapping("/{auctionId}")
    @ApiOperation(value = "경매 정보 삭제", notes = "선택된 <strong>경매 ID</strong>의 제품 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity deleteAuctionById(
            @PathVariable Long auctionId,
            @ApiIgnore Authentication authentication
    ) {
        if(authentication == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        String result;
        try {
            result = auctionService.deleteAuction(auctionId, user.getUserId());

            if(result.equals("not owner"))
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            else if(!result.equals("success"))
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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

    @PostMapping("/like")
    @ApiOperation(value = "경매 좋아요 등록", notes = "현재 로그인 유저로 <strong>경매 ID</strong>를 받아서 좋아요를 입력한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "타겟이 존재하지 않음"),
            @ApiResponse(code = 409, message = "이미 좋아요를 찍은 유저"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity insertAuctionLike(
            @RequestBody @ApiParam(value = "좋아요를 찍을 경매 ID", required = true) @Valid LikeRequest likeRequest,
            @ApiIgnore Authentication authentication
    ) {
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        String result;
        try {
            result = auctionService.insertAuctionLike(likeRequest.getAuctionId(), user.getUserId());
        } catch (Exception e) {
            if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            else if(e.getMessage().equals("already liked")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/like/{auctionId}")
    @ApiOperation(value = "경매 좋아요 삭제", notes = "현재 로그인된 유저의 해당 <strong>경매 ID</strong>의 경매 좋아요를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "아직 좋아요를 찍지 않은 유저"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "존재하지 않는 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity deleteAuctionLike(
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
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            else if(e.getMessage().equals("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        return ResponseEntity.ok().build();
    }
}
