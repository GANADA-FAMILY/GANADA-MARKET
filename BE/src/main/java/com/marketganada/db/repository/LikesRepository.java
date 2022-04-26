package com.marketganada.db.repository;

import com.marketganada.db.entity.Likes;
import com.marketganada.db.entity.LikesId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes, LikesId> {
}
