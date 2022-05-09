package com.marketganada.api.response;

import com.marketganada.db.entity.CategoryMiddle;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Transactional
public class CategoryMiddleListResponse extends BaseResponseBody {
    List<CategoryMiddleListResponse.CategoryMiddleList> categoryMiddleList;

    public static CategoryMiddleListResponse of(int statusCode, String message, List<CategoryMiddle> categoryMiddles) {
        CategoryMiddleListResponse res = new CategoryMiddleListResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setCategoryMiddleList(new ArrayList<>());

        for(CategoryMiddle c : categoryMiddles) {
            res.getCategoryMiddleList().add(CategoryMiddleListResponse.CategoryMiddleList.builder()
                    .categoryMiddle(c)
                    .build());
        }

        return res;
    }

    @Getter
    static class CategoryMiddleList {
        Long categoryMiddleId;
        String categoryMiddleName;
        Long categoryLargeId;
        String categoryLargeName;

        @Builder
        public CategoryMiddleList(CategoryMiddle categoryMiddle) {
            categoryMiddleId = categoryMiddle.getCategoryMiddleId();
            categoryMiddleName = categoryMiddle.getName();
            categoryLargeId = categoryMiddle.getCategoryLarge().getCategoryLargeId();
            categoryLargeName = categoryMiddle.getCategoryLarge().getName();
        }
    }
}
