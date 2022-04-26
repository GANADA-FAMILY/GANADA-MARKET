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

    @Builder
    public CategorySmall(String name, CategoryMiddle categoryMiddle) {
        this.name = name;
        this.categoryMiddle = categoryMiddle;
    }

    @Override
    public String toString() {
        return "CategorySmall{" +
                "categorySmallId=" + categorySmallId +
                ", name='" + name + '\'' +
                ", categoryMiddle=" + categoryMiddle +
                ", products=" + products +
                '}';
    }
}
