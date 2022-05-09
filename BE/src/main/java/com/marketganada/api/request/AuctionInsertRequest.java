package com.marketganada.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ApiModel("ProductInsertRequest")
public class AuctionInsertRequest {
    @ApiModelProperty(name = "경매 제목")
    @NotBlank
    String auctionTitle;

    @ApiModelProperty(name = "경매 사진")
    @NotNull
    List<MultipartFile> auctionImages;

    @ApiModelProperty(name = "제품 ID")
    @NotNull
    Long productId;

    @ApiModelProperty(name = "경매 시작가")
    @NotNull
    int startPrice;

    @ApiModelProperty(name = "감가 주기")
    @NotNull
    int cycle;

    @ApiModelProperty(name = "감가액")
    @NotNull
    int depreciation;

    @ApiModelProperty(name = "종료 일시")
    @NotNull
    Date endTime;
}
