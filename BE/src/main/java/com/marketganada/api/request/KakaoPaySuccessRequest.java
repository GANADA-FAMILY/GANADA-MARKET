package com.marketganada.api.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class KakaoPaySuccessRequest {

    @NotBlank
    String orderId;
    @NotBlank
    String tId;
    @NotBlank
    String pgToken;

}
