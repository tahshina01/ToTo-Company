package com.example.travelApp.services.impl;

import com.example.travelApp.dto.FileDto;
import com.example.travelApp.dto.GetLandMarkDto;
import com.example.travelApp.dto.LandMarkDto;
import com.example.travelApp.models.*;
import com.example.travelApp.repositories.LandMarkImageRepository;
import com.example.travelApp.repositories.LandMarkRepository;
import com.example.travelApp.services.LandMarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LandMarkServiceImpl implements LandMarkService {
    @Autowired
    private final LandMarkRepository landMarkRepository;
    @Autowired
    private final LandMarkImageRepository landMarkImageRepository;
    @Override
    public ResponseEntity<String> add(List<MultipartFile> documents, LandMarkDto landMarkDto) throws IOException {
        LandMark landMark = LandMark.builder()
                .name(landMarkDto.getName())
                .description(landMarkDto.getDescription())
                .location(landMarkDto.getLocation())
                .type(landMarkDto.getType())
                .build();
        LandMark savedLandMark = landMarkRepository.save(landMark);

        for (MultipartFile document : documents) {
            LandMarkImages landMarkImages = LandMarkImages.builder()
                    .landMark(savedLandMark)
                    .data(document.getBytes())
                    .build();
            landMarkImageRepository.save(landMarkImages);
        }
        return ResponseEntity.ok("Room added successfully");
    }

    @Override
    public ResponseEntity<List<GetLandMarkDto>> getAll() {
        List<LandMark> landMarks = landMarkRepository.findAll();
        List<GetLandMarkDto> getLandMarkDtos = new ArrayList<>();
        for (LandMark landMark: landMarks) {
            List<LandMarkImages> landMarkImages = landMarkImageRepository.findByLandMarkId(landMark.getId());
            List<FileDto> fileDtos = new ArrayList<>();
            for (LandMarkImages landMarkImage: landMarkImages) {
                fileDtos.add(FileDto.builder()
                        .id(landMarkImage.getId())
                        .data(landMarkImage.getData())
                        .build());
            }
            GetLandMarkDto getLandMarkDto = GetLandMarkDto.builder()
                    .id(landMark.getId())
                    .name(landMark.getName())
                    .description(landMark.getDescription())
                    .location(landMark.getLocation())
                    .type(landMark.getType())
                    .images(fileDtos)
                    .build();
            getLandMarkDtos.add(getLandMarkDto);
        }
        return ResponseEntity.ok(getLandMarkDtos);
    }

    @Override
    public ResponseEntity<String> edit(List<MultipartFile> documents, LandMarkDto landMarkDto) throws IOException {
        LandMark landMark = LandMark.builder()
                .id(landMarkDto.getId())
                .name(landMarkDto.getName())
                .description(landMarkDto.getDescription())
                .location(landMarkDto.getLocation())
                .type(landMarkDto.getType())
                .build();
        LandMark savedLandMark = landMarkRepository.save(landMark);

        List<Integer> prevAttachments = landMarkImageRepository.getPrevFilesByLandMarkId(landMarkDto.getId());
        for (Integer prevAttachment : prevAttachments) {
            if (!landMarkDto.getPrevImages().contains(prevAttachment)) {
                landMarkImageRepository.deleteById(prevAttachment);
            }
        }

        for (MultipartFile document : documents) {
            LandMarkImages landMarkImages = LandMarkImages.builder()
                    .landMark(savedLandMark)
                    .data(document.getBytes())
                    .build();
            landMarkImageRepository.save(landMarkImages);
        }
        return ResponseEntity.ok("Room added successfully");
    }
}
