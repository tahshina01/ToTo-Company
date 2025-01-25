package com.example.travelApp.facade;

import com.example.travelApp.dto.GetLandMarkDto;
import com.example.travelApp.dto.LandMarkDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface LandmarkFacade {
    ResponseEntity<String> addLandmark(MultipartFile[] documents, LandMarkDto landMarkDto) throws IOException;
    ResponseEntity<String> editLandmark(MultipartFile[] documents, LandMarkDto landMarkDto) throws IOException;
    ResponseEntity<List<GetLandMarkDto>> getAllLandmarks();
}
