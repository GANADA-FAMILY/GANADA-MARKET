package com.marketganada.api.contoroller;

import com.marketganada.api.request.AddressBookInsertRequest;
import com.marketganada.api.request.UserBankUpdateRequest;
import com.marketganada.api.request.UserNicknameUpdateRequest;
import com.marketganada.api.request.UserPwUpdateRequest;
import com.marketganada.api.response.*;
import com.marketganada.api.service.AuctionService;
import com.marketganada.api.service.UserService;
import com.marketganada.config.auth.GanadaUserDetails;
import com.marketganada.db.entity.AddressBook;
import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.Likes;
import com.marketganada.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.List;

@Api(value = "유저 API", tags = {"User."})
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuctionService auctionService;


    @GetMapping
    @ApiOperation(value = "회원 정보 조회", notes = " 토큰을 통해 <strong>회원 정보 조회</strong>를 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserInfoResponse.class),
            @ApiResponse(code = 401, message = "회원가입 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getUserInfo(@ApiIgnore Authentication authentication) {
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        return ResponseEntity.status(200).body(UserInfoResponse.of(200, "OK", user));
    }

    @DeleteMapping
    @ApiOperation(value = "회원 정보 삭제", notes = " 토큰을 통해 <strong>회원 삭제</strong>를 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserInfoResponse.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteUser(@ApiIgnore Authentication authentication) {
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        userService.deleteUser(user);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "OK"));
    }

    @PutMapping("/nickname")
    @ApiOperation(value = "닉네임 변경", notes = " 입력한 닉네임으로 닉네임을 변경한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 409, message = "중복 검사 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateUserNickname(@ApiIgnore Authentication authentication,
                                                                         @ApiParam(value = "변경할 닉네임", required = true) @Valid
                                                                         @RequestBody UserNicknameUpdateRequest userNicknameUpdateRequest) {
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        String res = userService.updateUserNickname(userNicknameUpdateRequest, user);
        if(res.equals("fail")){
            return ResponseEntity.status(409).body(BaseResponseBody.of(409,"Conflict"));
        }
        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Created"));
    }

    @PutMapping("/pw")
    @ApiOperation(value = "비밀번호 변경", notes = " 현재 비밀번호와 새 비밀번호를 입력받아 확인하고 비밀번호를 변경한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "현재 비밀번호 불일치"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateUserPw(@ApiIgnore Authentication authentication,
                                                                   @ApiParam(value = "현재 비밀번호, 변경할 비밀번호", required = true) @Valid
                                                                   @RequestBody UserPwUpdateRequest userPwUpdateRequest) {
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        String res = userService.updateUserPw(userPwUpdateRequest, user);
        if(res.equals("fail")){
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"Unauthorized"));
        }
        return ResponseEntity.status(201).body(BaseResponseBody.of(200, "Created"));
    }

    @GetMapping("/bank")
    @ApiOperation(value = "정산 계좌 조회", notes = "회원의 정산계좌를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserBankResponse.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getUserBank(@ApiIgnore Authentication authentication
                                                                     ) throws Exception {
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        return ResponseEntity.status(200).body(UserBankResponse.of(200, "OK",user));
    }
    @PutMapping("/bank")
    @ApiOperation(value = "정산 계좌 등록 및 수정", notes = " 은행명, 계좌번호, 예금주를 입력받아 정산계좌로 등록 및 변경한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateUserBank(@ApiIgnore Authentication authentication,
                                                                     @ApiParam(value = "정산계좌 등록 및 수정 정보", required = true) @Valid
                                                                     @RequestBody UserBankUpdateRequest userBankUpdateRequest) throws Exception {
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        userService.updateUserBank(userBankUpdateRequest, user);

        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Created"));
    }


    @PostMapping("/addressbook")
    @ApiOperation(value = "주소록 등록", notes = "주소지 이름, 연락처, 우편번호, 주소, 상세주소를 입력받아 주소록에 저장한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> insertAddressBook(@ApiIgnore Authentication authentication,
                                                                    @ApiParam(value = "주소록 요청 정보", required = true) @Valid
                                                                    @RequestBody AddressBookInsertRequest addressBookInsertRequest){
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        userService.insertUserAddressBook(addressBookInsertRequest, user);

        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Created"));
    }

    @GetMapping("/addressbook")
    @ApiOperation(value = "주소록 조회", notes = "주소록 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = AddressBookListResponse.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getAddressBook(@ApiIgnore Authentication authentication){
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        List<AddressBook> addressBookList = userService.getAddressBookList(user);

        return ResponseEntity.status(200).body(AddressBookListResponse.of(200, "OK", addressBookList));
    }

    @PutMapping("/addressbook/{addressId}")
    @ApiOperation(value = "주소록 수정", notes = "주소지 이름, 연락처, 우편번호, 주소, 상세주소를 입력받아 주소록에 저장한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "주소록 수정 실패"),
            @ApiResponse(code = 404, message = "리소스 찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateAddressBook(@ApiIgnore Authentication authentication,
                                                                        @PathVariable("addressId") Long addressId,
                                                                        @ApiParam(value = "주소록 요청 정보", required = true) @Valid
                                                                        @RequestBody AddressBookInsertRequest addressBookInsertRequest){
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        String res = userService.updateAddressBook(addressBookInsertRequest,user,addressId);

        if(res.equals("fail")){
            return ResponseEntity.status(401).body(BaseResponseBody.of(404,"Not Found"));
        }
        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Created"));
    }

    @DeleteMapping("/addressbook/{addressId}")
    @ApiOperation(value = "주소록 삭제", notes = "주소지를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginResponse.class),
            @ApiResponse(code = 401, message = "주소록 삭제 실패"),
            @ApiResponse(code = 404, message = "리소스 찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteAddressBook(@ApiIgnore Authentication authentication,
                                                                        @PathVariable("addressId") Long addressId){
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        String res = userService.deleteAddressBook(user,addressId);

        if(res.equals("fail")){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"Not Found"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "OK"));
    }

    @PutMapping("/represent/{addressId}")
    @ApiOperation(value = "대표 주소 수정", notes = "입력받은 주소를 대표 주소로 변경한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "입력 데이터 오류"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없는 유저"),
            @ApiResponse(code = 404, message = "리소스 찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateActivateAddressBook(@ApiIgnore Authentication authentication,
                                                                        @PathVariable("addressId") Long addressId){
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        String res = userService.updateActivateAddressBook(user,addressId);
        if(res.equals("fail")){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"Not Found"));
        }
        return ResponseEntity.status(201).body(BaseResponseBody.of(200, "Created"));
    }

    @GetMapping("/likelist")
    @ApiOperation(value = "관심상품 리스트 조회", notes = "관심상품 리스트를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = LikeAuctionListResponse.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getLikeAuctionList(@ApiIgnore Authentication authentication){
        GanadaUserDetails userDetails = (GanadaUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        List<Likes> likesList = auctionService.getLikeAuctionList(user);

        return ResponseEntity.status(200).body(LikeAuctionListResponse.of(200, "OK",likesList));
    }


}
