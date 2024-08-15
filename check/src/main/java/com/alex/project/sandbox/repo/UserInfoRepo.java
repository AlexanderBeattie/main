package com.alex.project.sandbox.repo;

import com.alex.project.sandbox.entity.UserInfoEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInfoRepo extends JpaRepository<UserInfoEntity, Long> {

  Optional<UserInfoEntity> findByEmailId(String emailId);
}
