package com.example.travelApp.controllers;

import com.example.travelApp.dto.LoginDto;
import com.example.travelApp.dto.UpdateProfileDto;
import com.example.travelApp.facade.UserFacade;
import com.example.travelApp.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/user")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

    private final UserFacade userFacade;

    @PutMapping("/updateProfile")
    public ResponseEntity<String> updateUser(@RequestParam(value = "file", required = false) MultipartFile file,
                                             @ModelAttribute UpdateProfileDto updateProfileDto) {
        try {
            return userFacade.updateUser(file, updateProfileDto);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to update user");
        }
    }

    @PutMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody LoginDto loginDto) {
        return userFacade.updatePassword(loginDto);
    }

    @GetMapping("/getUser")
    public ResponseEntity<User> getUser(@RequestParam String userId) {
        return userFacade.getUser(userId);
    }
}