package com.marketganada.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("LikeRequest")
public class LikeRequest {
    @ApiModelProperty(name = "관심상품 타겟 ID")
    Long auctionId;
}
