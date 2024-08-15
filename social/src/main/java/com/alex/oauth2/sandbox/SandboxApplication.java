package com.alex.oauth2.sandbox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SandboxApplication {

  public static void main(String[] args) {
    System.out.println("Application started"); // Add this line
    SpringApplication.run(SandboxApplication.class, args);
  }
}
