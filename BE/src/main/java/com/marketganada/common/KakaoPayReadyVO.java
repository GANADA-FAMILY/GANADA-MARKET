package com.marketganada.common;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class KakaoPayReadyVO {

    //response
    private String tid, next_redirect_pc_url;
    private Date created_at;

}
