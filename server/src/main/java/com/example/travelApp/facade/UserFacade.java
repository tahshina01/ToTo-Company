package com.example.travelApp.facade;


import com.example.travelApp.dto.LoginDto;
import com.example.travelApp.dto.UpdateProfileDto;
import com.example.travelApp.models.User;
import com.example.travelApp.services.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class UserFacade {

    private final UserServiceImpl userService;

    public ResponseEntity<String> updateUser(MultipartFile file, UpdateProfileDto updateProfileDto) throws IOException {
        updateProfileDto.setProfilePic(null);
        if (file != null && !file.isEmpty()) {
            updateProfileDto.setProfilePic(file.getBytes());
        }
        if (updateProfileDto.getMobile().equals("")) {
            updateProfileDto.setMobile(null);
        }
        if (updateProfileDto.getAddress().equals("")) {
            updateProfileDto.setAddress(null);
        }
        return userService.updateUser(updateProfileDto);
    }

    public ResponseEntity<String> updatePassword(LoginDto loginDto) {
        return userService.updatePassword(loginDto);
    }

    public ResponseEntity<User> getUser(String userId) {
        return userService.getUser(userId);
    }
}
