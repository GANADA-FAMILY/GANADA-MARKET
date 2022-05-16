package com.marketganada.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@ApiModel("PaymentInsertRequest")
public class PaymentInsertRequest {
    @ApiModelProperty(name = "경매 번호")
    @NotNull
    Long auctionId;

    @ApiModelProperty(name = "가격")
    @NotNull
    int price;

    @ApiModelProperty(name = "결제 방법")
    @NotBlank
    String paymentMethod;

    @ApiModelProperty(name = "받는분")
    @NotBlank
    String buyerName;

    @ApiModelProperty(name = "연락처")
    @NotNull
    String phone;

    @ApiModelProperty(name = "우편번호")
    @NotNull
    int postalCode;

    @ApiModelProperty(name = "주소")
    @NotNull
    String address;

    @ApiModelProperty(name = "상세주소")
    @NotNull
    String addressDetail;

}
