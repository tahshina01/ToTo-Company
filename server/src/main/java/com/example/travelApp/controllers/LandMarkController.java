package com.example.travelApp.controllers;

import com.example.travelApp.dto.GetLandMarkDto;
import com.example.travelApp.dto.LandMarkDto;
import com.example.travelApp.facade.LandmarkFacadeImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/landmark")
@CrossOrigin
@RequiredArgsConstructor
public class LandMarkController {

    @Autowired
    private final LandmarkFacadeImpl landmarkFacade;


    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestParam(value = "attachments", required = false) MultipartFile[] files,
                                      @ModelAttribute LandMarkDto landMarkDto) {
        try {
            return landmarkFacade.addLandmark(files, landMarkDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/edit")
    public ResponseEntity<String> edit(@RequestParam(value = "attachments", required = false) MultipartFile[] files,
                                       @ModelAttribute LandMarkDto landMarkDto) {
        try {
            return landmarkFacade.editLandmark(files, landMarkDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<GetLandMarkDto>> getAll() {
        return landmarkFacade.getAllLandmarks();
    }
}
