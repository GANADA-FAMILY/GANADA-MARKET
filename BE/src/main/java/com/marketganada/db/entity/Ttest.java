package com.marketganada.db.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name="Ttest")
public class Ttest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "test_id")
    int testId;

}
