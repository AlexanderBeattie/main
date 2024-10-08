package com.alex.oauth2.sandbox.security;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProxyConfig {

  @PostConstruct
  public void setProxyProperties() {
    System.setProperty("https.proxyHost", "BLANK");
    System.setProperty("https.proxyPort", "8080" );
  }
}
