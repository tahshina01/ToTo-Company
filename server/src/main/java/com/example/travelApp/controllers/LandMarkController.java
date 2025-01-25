package com.example.travelApp.controllers;

import com.example.travelApp.dto.GetLandMarkDto;
import com.example.travelApp.dto.LandMarkDto;
import com.example.travelApp.dto.RoomDto;
import com.example.travelApp.services.impl.LandMarkServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/landmark")
@CrossOrigin
public class LandMarkController {
    @Autowired
    private LandMarkServiceImpl landMarkService;

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestParam(value = "attachments", required = false) MultipartFile[] files,
                                          @ModelAttribute LandMarkDto landMarkDto) {
        try {
            List<MultipartFile> documents = new ArrayList<>();
            if (files != null) {
                for (MultipartFile f : files) {
                    if (!f.isEmpty()) {
                        documents.add(f);
                    }
                }
            }
            return landMarkService.add(documents, landMarkDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/edit")
    public ResponseEntity<String> edit(@RequestParam(value = "attachments", required = false) MultipartFile[] files,
                                      @ModelAttribute LandMarkDto landMarkDto) {
        try {
            List<MultipartFile> documents = new ArrayList<>();
            if (files != null) {
                for (MultipartFile f : files) {
                    if (!f.isEmpty()) {
                        documents.add(f);
                    }
                }
            }
            return landMarkService.edit(documents, landMarkDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<GetLandMarkDto>> getAll() {
        return landMarkService.getAll();
    }

}
