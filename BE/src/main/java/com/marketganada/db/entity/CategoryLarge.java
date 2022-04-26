package com.marketganada.db.entity;

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
@Table(name="CategoryLarge")
public class CategoryLarge {
    @Id
    @Column(name = "category_large_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryLargeId;

    @Column(name = "name", columnDefinition = "varchar(20)")
    private String name;

    @OneToMany(mappedBy = "categoryLarge", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<CategoryMiddle> categoryMiddles = new HashSet<>();

    @OneToMany(mappedBy = "categoryLarge", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<Product> products = new HashSet<>();

    @Builder
    public CategoryLarge(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "CategoryLarge{" +
                "categoryLargeId=" + categoryLargeId +
                ", name='" + name + '\'' +
                ", categoryMiddles=" + categoryMiddles +
                ", products=" + products +
                '}';
    }
}
