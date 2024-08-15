package com.alex.project.sandbox.config.userConfig;

import com.alex.project.sandbox.entity.UserInfoEntity;
import com.alex.project.sandbox.repo.UserInfoRepo;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
@Slf4j
public class InitialUserInfo implements CommandLineRunner {

  private final UserInfoRepo userInfoRepo;
  private final PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) throws Exception {
    UserInfoEntity manager = new UserInfoEntity();
    manager.setUserName("Manager");
    manager.setPassword(passwordEncoder.encode("password"));
    manager.setRoles("ROLE_MANAGER");
    manager.setEmailId("manager@manager.com");

    UserInfoEntity admin = new UserInfoEntity();
    admin.setUserName("Admin");
    admin.setPassword(passwordEncoder.encode("password"));
    admin.setRoles("ROLE_ADMIN");
    admin.setEmailId("admin@admin.com");

    UserInfoEntity user = new UserInfoEntity();
    user.setUserName("User");
    user.setPassword(passwordEncoder.encode("password"));
    user.setRoles("ROLE_USER");
    user.setEmailId("userConfig@userConfig.com");

    userInfoRepo.saveAll(List.of(manager, admin, user));
  }

}
