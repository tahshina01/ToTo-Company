package com.example.travelApp.services;

import com.example.travelApp.dto.*;
import com.example.travelApp.models.User;
import org.springframework.http.ResponseEntity;

public interface UserService {
    void addUser(SignupDto user);

    ResponseEntity<String> updateUser(UpdateProfileDto updateProfileDto);

    ResponseEntity<String> updatePassword(LoginDto loginDto);

    void addOAuthUser(GoogleAuth user);

    ResponseEntity<User> getUser(String userId);

}
