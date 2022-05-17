package com.marketganada.api.response;

import com.marketganada.db.entity.AddressBook;
import com.marketganada.db.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@ApiModel("AddressBookListResponse")
public class AddressBookListResponse {

    List<Map<String, Object>> addressBookList;

    public static AddressBookListResponse of(List<AddressBook> addressBooks){
        AddressBookListResponse res = new AddressBookListResponse();

        List<Map<String, Object>> addressBookList = new ArrayList<>();

        for(int i=0; i<addressBooks.size(); i++){
            Map<String, Object> addressInfo = new HashMap<>();
            addressInfo.put("addressId",addressBooks.get(i).getAddressId());
            addressInfo.put("addressName",addressBooks.get(i).getAddressName());
            addressInfo.put("addressPhone",addressBooks.get(i).getAddressPhone());
            addressInfo.put("postalCode",addressBooks.get(i).getPostalCode());
            addressInfo.put("address",addressBooks.get(i).getAddress());
            addressInfo.put("addressDetail",addressBooks.get(i).getAddressDetail());
            addressBookList.add(addressInfo);
        }
        res.setAddressBookList(addressBookList);

        return res;
    }
}
