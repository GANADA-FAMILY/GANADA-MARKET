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
@Table(name="CategorySmall")
public class CategorySmall {
    @Id
    @Column(name = "category_small_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categorySmallId;

    @Column(name = "name", columnDefinition = "varchar(20)")
    private String name;

    @ManyToOne
    @JoinColumn(name = "category_middle_id")
    private CategoryMiddle categoryMiddle;

    @OneToMany(mappedBy = "categorySmall", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<Product> products = new HashSet<>();
}
