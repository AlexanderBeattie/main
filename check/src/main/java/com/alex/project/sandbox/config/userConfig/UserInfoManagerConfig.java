package com.alex.project.sandbox.config.userConfig;


import com.alex.project.sandbox.repo.UserInfoRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserInfoManagerConfig implements UserDetailsService {

  private final UserInfoRepo userInfoRepo;

  @Override
  public UserDetails loadUserByUsername(String emailId) throws UsernameNotFoundException {
    return userInfoRepo
        .findByEmailId(emailId)
        .map(UserInfoConfig::new)
        .orElseThrow(() -> new UsernameNotFoundException("UserEmail: " + emailId + " does not exist"));
  }
}

//Get me the userConfig in form of Auth Object
