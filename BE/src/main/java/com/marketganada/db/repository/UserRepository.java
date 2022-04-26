package com.marketganada.db.repository;

import com.marketganada.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUserEmail(String userEmail); // 유저 이메일로 검색
}
