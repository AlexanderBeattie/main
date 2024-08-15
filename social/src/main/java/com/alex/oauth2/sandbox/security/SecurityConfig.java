package com.alex.oauth2.sandbox.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .authorizeRequests(authorizeRequests ->
            authorizeRequests
                .requestMatchers("/", "/login", "/oauth_login", "/error", "/index.html")
                .permitAll()
                .anyRequest()
                .authenticated()
        )
        //form
        .formLogin(formLogin ->
            formLogin
                .loginPage("/login")
                .permitAll()
                .defaultSuccessUrl("/index.html", true)
        )

        //oauth
        .oauth2Login(oauth2Login ->
            oauth2Login
                .loginPage("/oauth_login")
                .failureUrl("/login?error=true")
                .defaultSuccessUrl("/index.html", true)
        )

        //logout
        .logout(logout ->
            logout
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/login")
                .permitAll()
        );

    return http.build();
  }

  //used for testing index.html without oauth
  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth, PasswordEncoder passwordEncoder) throws Exception {
    auth.inMemoryAuthentication()
        .withUser("admin")
        .password(passwordEncoder.encode("admin"))
        .roles("ADMIN");
  }
}