package com.example.travelApp.services;

import com.example.travelApp.dto.*;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<JwtAuthResponse> userSignup(SignupDto request);

    ResponseEntity<JwtAuthResponse> userLogin(LoginDto request);

    ResponseEntity<JwtAuthResponse> googleAuth(GoogleAuth request);

    ResponseEntity<String> saveOtp(OTPDto request);

    ResponseEntity<JwtAuthResponse> verifyOtp(OTPDto request, String username, String password);
}
