package com.example.travelApp.components;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuthEntryPoint implements AuthenticationEntryPoint {
    private static volatile AuthEntryPoint instance;

    // Private constructor
    private AuthEntryPoint() {
        // Prevent instantiation via reflection
        if (instance != null) {
            throw new RuntimeException("Use getInstance() method to get the instance");
        }
    }

    public static AuthEntryPoint getInstance() {
        if (instance == null) {
            synchronized (AuthEntryPoint.class) {
                if (instance == null) {
                    instance = new AuthEntryPoint();
                }
            }
        }
        return instance;
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }

    // Prevent cloning
    @Override
    protected Object clone() throws CloneNotSupportedException {
        throw new CloneNotSupportedException();
    }
}
