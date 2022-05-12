package com.marketganada.db.repository;

import com.marketganada.db.entity.Likes;
import com.marketganada.db.entity.LikesId;
import com.marketganada.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikesRepository extends JpaRepository<Likes, LikesId> {
    List<Likes> findByUser(User user);
}
