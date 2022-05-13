package com.marketganada.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseResponse<T> {

    private Integer statusCode = null;
    private String message = null;
    private T data;

    public BaseResponse() {}

    public BaseResponse(Integer statusCode){
        this.statusCode = statusCode;
    }

    public BaseResponse(Integer statusCode, String message){
        this.statusCode = statusCode;
        this.message = message;
    }


    public BaseResponse of(Integer statusCode, String message, T data) {
        BaseResponse body = new BaseResponse();
        body.message = message;
        body.statusCode = statusCode;
        body.data = data;
        return body;
    }


}
