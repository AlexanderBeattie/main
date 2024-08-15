// LoginController.java
package com.alex.oauth2.sandbox.security;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {

  public LoginController() {
    System.out.println("LoginController initialized");
  }

  @RequestMapping("/login")
  public String login() {
    return "login";
  }

  @RequestMapping("/login/oauth2/error")
  public String getError(@RequestParam("error") String error) {
    return "login";  // Redirect to login page with an error message
  }

  @RequestMapping({ "/index", "/" })
  public String index() {
    return "index";
  }
}