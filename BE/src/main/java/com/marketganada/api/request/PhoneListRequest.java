package com.marketganada.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//@ApiModel("ProductInsertRequest")
public class PhoneListRequest {
    int page;
    String id;
    String dir;
    String brand;
    String model;
    String save;
}
