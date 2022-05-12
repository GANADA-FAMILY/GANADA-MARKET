package com.marketganada.db.repository;

import com.marketganada.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUserEmail(String userEmail); // 유저 이메일로 검색
    Optional<User> findByUserNickname(String userNickname); // 유저 닉네임으로 검색
    List<User> findByUserPhoneAndUserType(String userPhone,int userType);
}
