package com.marketganada.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@ApiModel("ProductInsertRequest")
public class AuctionInsertRequest {
    @ApiModelProperty(name = "경매 제목")
    String auctionTitle;

    @ApiModelProperty(name = "경매 사진")
    List<MultipartFile> auctionImages;

    @ApiModelProperty(name = "제품 ID")
    int productId;

    @ApiModelProperty(name = "경매 시작가")
    int startPrice;

    @ApiModelProperty(name = "감가 주기")
    Date cycle;

    @ApiModelProperty(name = "감가액")
    int depreciation;

    @ApiModelProperty(name = "종료 일시")
    Date endTime;
}
