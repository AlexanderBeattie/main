package com.alex.project.sandbox.repo;

import com.alex.project.sandbox.entity.RefreshTokenEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepo extends JpaRepository<RefreshTokenEntity, Long> {

  Optional<RefreshTokenEntity> findByRefreshToken(String refreshToken);

}