package com.marketganada.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ApiModel("AuctionInsertRequest")
public class AuctionInsertRequest {
    @ApiModelProperty(name = "경매 제목")
    @NotBlank
    String auctionTitle;

    @ApiModelProperty(name = "제품 ID")
    @NotNull
    Long productId;

    @ApiModelProperty(name = "경매 시작가")
    @NotNull
    int startPrice;

    @ApiModelProperty(name = "감가 주기")
    @NotNull
    int cycle;

    @ApiModelProperty(name = "경매 설명")
    @NotNull
    String description;

    @ApiModelProperty(name = "감가액")
    @NotNull
    int depreciation;

    @ApiModelProperty(name = "종료 일시", example = "yyyy.MM.dd HH:mm:ss")
    @NotBlank
    String endTime;
}
