package com.marketganada.db.entity;

import com.marketganada.api.request.CategoryLargeInsertRequest;
import com.marketganada.api.request.CategoryMiddleInsertRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Table(name="CategoryMiddle")
public class CategoryMiddle {
    @Id
    @Column(name = "category_middle_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryMiddleId;

    @Column(name = "name", columnDefinition = "varchar(20)")
    private String name;

    @ManyToOne
    @JoinColumn(name = "category_large_id")
    private CategoryLarge categoryLarge;

    @OneToMany(mappedBy = "categoryMiddle", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<CategorySmall> categorySmalls = new HashSet<>();

    @OneToMany(mappedBy = "categoryMiddle", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<Product> products = new HashSet<>();

    @Builder
    public CategoryMiddle(String name, CategoryLarge categoryLarge) {
        this.name = name;
        this.categoryLarge = categoryLarge;
    }

    public void update(CategoryMiddleInsertRequest categoryMiddleInsertRequest, CategoryLarge categoryLarge) {
        name = categoryMiddleInsertRequest.getCategoryName();
        this.categoryLarge = categoryLarge;
    }

    @Override
    public String toString() {
        return "CategoryMiddle{" +
                "categoryMiddleId=" + categoryMiddleId +
                ", name='" + name + '\'' +
                ", categoryLarge=" + categoryLarge +
                ", categorySmalls=" + categorySmalls +
                ", products=" + products +
                '}';
    }
}
