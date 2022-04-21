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
}
