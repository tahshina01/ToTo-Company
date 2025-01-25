package com.example.travelApp.facade;

import com.example.travelApp.dto.LoginDto;
import com.example.travelApp.dto.UpdateProfileDto;
import com.example.travelApp.models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserFacade {
    ResponseEntity<String> updateUser(MultipartFile file, UpdateProfileDto updateProfileDto) throws IOException;
    ResponseEntity<User> getUser(String userId);
    ResponseEntity<String> updatePassword(LoginDto loginDto);
}
