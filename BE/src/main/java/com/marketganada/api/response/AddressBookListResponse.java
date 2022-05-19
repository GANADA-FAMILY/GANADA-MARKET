package com.marketganada.api.response;

import com.marketganada.db.entity.AddressBook;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

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
            addressInfo.put("activate",addressBooks.get(i).isActivate());
            addressBookList.add(addressInfo);
        }
        Collections.sort(addressBookList, new Comparator<Map<String, Object>>() {
            @Override
            public int compare(Map<String, Object> o1, Map<String, Object> o2) {
                Boolean activate1 = (Boolean) o1.get("activate");
                Boolean activate2 = (Boolean) o2.get("activate");
                return activate2.compareTo(activate1);
            }
        });

        res.setAddressBookList(addressBookList);

        return res;
    }
}
