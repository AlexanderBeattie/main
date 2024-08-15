package com.alex.project.sandbox.dto;

import jakarta.validation.constraints.NotEmpty;

public record LoginForm (
    @NotEmpty(message = "User email must not be empty")
    String userEmail,

    @NotEmpty(message = "Password must not be empty")
    String password
) { }