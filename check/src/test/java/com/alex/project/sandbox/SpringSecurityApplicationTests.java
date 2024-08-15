package com.alex.project.sandbox;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
class SpringSecurityApplicationTests {

  @Autowired
  private MockMvc mockMvc;

  @BeforeEach
  void setUp() {
    // Any setup code can go here if needed
  }

  @Test
  void contextLoads() {
    // Test that the application context loads successfully
  }

  @Test
  @WithMockUser
    // Simulates an authenticated userConfig
  void testAccessSecuredEndpointWithValidUser() throws Exception {
    mockMvc.perform(get("/index"))
           .andExpect(status().isOk());
  }

  @Test
  void testAccessSecuredEndpointWithoutAuthentication() throws Exception {
    mockMvc.perform(get("/index"))
           .andExpect(status().isUnauthorized()); // Expect 401 Unauthorized
  }

  @Test
  void testLoginWithValidCredentials() throws Exception {
    String validUsername = "admin"; // Replace with your valid username
    String validPassword = "admin"; // Replace with your valid password

    mockMvc.perform(post("/login")
               .param("username", validUsername)
               .param("password", validPassword)
               .with(csrf())) // Include CSRF token
           .andExpect(status().is3xxRedirection()) // Expecting redirection
           .andExpect(redirectedUrl("/index")); // Expected redirect URL
  }

  @Test
  void testLoginWithInvalidCredentials() throws Exception {
    mockMvc.perform(post("/login")
               .param("username", "invalidUser")
               .param("password", "wrongPassword")
               .with(csrf())) // Include CSRF token
           .andExpect(status().is3xxRedirection())
           .andExpect(redirectedUrl("/login?error=true")); // Check for error redirection
  }

  @Test
  void testLogoutShouldRedirectToLogin() throws Exception {
    mockMvc.perform(post("/logout").with(csrf())) // CSRF token may be necessary for POST requests
           .andExpect(status().is3xxRedirection())
           .andExpect(redirectedUrl("/login?logout"));
  }

  @Test
  void testErrorHandlingReturnsErrorPage() throws Exception {
    mockMvc.perform(get("/someNonExistentEndpoint"))
           .andExpect(status().isNotFound()); // Expect 404 Not Found
  }

  @Test
  void testLoginPageLoads() throws Exception {
    mockMvc.perform(get("/login"))
           .andExpect(status().isOk())
           .andExpect(view().name("login")); // Check login view is returned
  }

  @Test
  void testErrorPageLoads() throws Exception {
    mockMvc.perform(get("/error"))
           .andExpect(status().isOk())
           .andExpect(view().name("error")); // Check error view is returned
  }
}