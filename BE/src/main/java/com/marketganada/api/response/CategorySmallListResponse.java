package com.marketganada.api.response;

import com.marketganada.db.entity.CategoryMiddle;
import com.marketganada.db.entity.CategorySmall;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CategorySmallListResponse {
    List<CategorySmallListResponse.CategorySmallList> categorySmallList;

    public static CategorySmallListResponse from(List<CategorySmall> categorySmalls) {
        CategorySmallListResponse res = new CategorySmallListResponse();
        res.setCategorySmallList(new ArrayList<>());

        for(CategorySmall c : categorySmalls) {
            res.getCategorySmallList().add(CategorySmallListResponse.CategorySmallList.builder()
                    .categorySmall(c)
                    .build());
        }

        return res;
    }

    @Getter
    static class CategorySmallList {
        Long categorySmallId;
        String categorySmallName;
        Long categoryMiddleId;
        String categoryMiddleName;

        @Builder
        public CategorySmallList(CategorySmall categorySmall) {
            categorySmallId = categorySmall.getCategorySmallId();
            categorySmallName = categorySmall.getName();
            categoryMiddleId = categorySmall.getCategoryMiddle().getCategoryMiddleId();
            categoryMiddleName = categorySmall.getCategoryMiddle().getName();
        }
    }
}
