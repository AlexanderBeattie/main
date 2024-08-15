package com.alex.project.sandbox.mapper;

import com.alex.project.sandbox.dto.UserRegistrationDto;
import com.alex.project.sandbox.entity.UserInfoEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserInfoMapper {
  private final PasswordEncoder passwordEncoder;
  public UserInfoEntity convertToEntity(UserRegistrationDto userRegistrationDto) {
    UserInfoEntity userInfoEntity = new UserInfoEntity();
    userInfoEntity.setUserName(userRegistrationDto.userName());
    userInfoEntity.setEmailId(userRegistrationDto.userEmail());
    userInfoEntity.setMobileNumber(userRegistrationDto.userMobileNo());
    userInfoEntity.setRoles(userRegistrationDto.userRole());
    userInfoEntity.setPassword(passwordEncoder.encode(userRegistrationDto.userPassword()));
    return userInfoEntity;
  }
}
