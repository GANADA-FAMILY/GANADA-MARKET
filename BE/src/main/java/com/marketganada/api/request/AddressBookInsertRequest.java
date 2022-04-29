package com.marketganada.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ApiModel("AddressBookInsertRequest")
public class AddressBookInsertRequest {
    @ApiModelProperty(name = "주소지 이름", example = "우리집")
    @NotBlank
    String addressName;
    @ApiModelProperty(name = "주소지 연락처", example = "010-1234-1234")
    @NotBlank
    String addressPhone;
    @ApiModelProperty(name = "우편번호", example = "12345")
    @NotBlank
    String postalCode;
    @ApiModelProperty(name = "주소", example = "서울시 강남구 테헤란로 212")
    @NotBlank
    String address;
    @ApiModelProperty(name = "상세 주소", example = "멀티캠퍼스 xxx동 xxx호")
    @NotBlank
    String addressDetail;

}
