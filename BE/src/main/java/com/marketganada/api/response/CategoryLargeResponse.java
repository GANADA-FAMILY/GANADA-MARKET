package com.marketganada.api.response;

import com.marketganada.db.entity.CategoryLarge;
import com.marketganada.db.entity.CategoryMiddle;
import com.marketganada.db.entity.CategorySmall;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class CategoryLargeResponse extends BaseResponseBody {
    String categoryLargeName;
    List<CategoryMiddleList> categoryMiddleList;

    public static CategoryLargeResponse of(int statusCode, String message, CategoryLarge categoryLarge) {
        CategoryLargeResponse res = new CategoryLargeResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setCategoryMiddleList(new ArrayList<>());

        Set<CategoryMiddle> categoryMiddles = categoryLarge.getCategoryMiddles();

        for(CategoryMiddle c : categoryMiddles) {
            res.getCategoryMiddleList().add(CategoryMiddleList.builder()
                    .categoryMiddle(c)
                    .build());
        }

        return res;
    }

    static class CategoryMiddleList {
        Long categoryMiddleId;
        String categoryMiddleName;
        List<CategorySmallList> categorySmallList;

        @Builder
        public CategoryMiddleList(CategoryMiddle categoryMiddle) {
            categoryMiddleId = categoryMiddle.getCategoryMiddleId();
            categoryMiddleName = categoryMiddle.getName();
            categorySmallList = new ArrayList<>();

            Set<CategorySmall> categorySmalls = categoryMiddle.getCategorySmalls();

            for(CategorySmall c : categorySmalls) {
                categorySmallList.add(CategorySmallList.builder()
                        .categorySmall(c)
                        .build());
            }
        }
    }

    static class CategorySmallList {
        Long categorySmallId;
        String categorySmallName;

        @Builder
        public CategorySmallList(CategorySmall categorySmall) {
            categorySmallId = categorySmall.getCategorySmallId();
            categorySmallName = categorySmall.getName();
        }
    }
}
