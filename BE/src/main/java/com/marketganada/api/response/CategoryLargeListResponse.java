package com.marketganada.api.response;

import com.marketganada.db.entity.CategoryLarge;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CategoryLargeListResponse {
    List<CategoryLargeList> categoryLargeList;

    public static CategoryLargeListResponse from(List<CategoryLarge> categoryLarges) {
        CategoryLargeListResponse res = new CategoryLargeListResponse();
        res.setCategoryLargeList(new ArrayList<>());

        for(CategoryLarge c : categoryLarges) {
            res.getCategoryLargeList().add(CategoryLargeList.builder()
                    .categoryLarge(c)
                    .build());
        }

        return res;
    }

    @Getter
    static class CategoryLargeList {
        Long categoryLargeId;
        String categoryLargeName;

        @Builder
        public CategoryLargeList(CategoryLarge categoryLarge) {
            categoryLargeId = categoryLarge.getCategoryLargeId();
            categoryLargeName = categoryLarge.getName();
        }
    }
}
