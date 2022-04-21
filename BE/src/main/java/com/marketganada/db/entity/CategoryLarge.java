package com.marketganada.db.entity;

import lombok.Getter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
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
}
