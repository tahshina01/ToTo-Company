package com.example.travelApp.services;

import com.example.travelApp.dto.GetLandMarkDto;
import com.example.travelApp.dto.LandMarkDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface LandMarkService {
    ResponseEntity<String> add(List<MultipartFile> documents, LandMarkDto landMarkDto) throws IOException;

    ResponseEntity<List<GetLandMarkDto>> getAll();

    ResponseEntity<String> edit(List<MultipartFile> documents, LandMarkDto landMarkDto) throws IOException;
}
