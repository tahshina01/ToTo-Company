package com.example.travelApp.facade;

import com.example.travelApp.dto.LandMarkDto;
import com.example.travelApp.services.impl.LandMarkServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import com.example.travelApp.dto.GetLandMarkDto;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class LandmarkFacadeImpl implements LandmarkFacade {

    private final LandMarkServiceImpl landMarkService;

    @Override
    public ResponseEntity<String> addLandmark(MultipartFile[] files, LandMarkDto landMarkDto) throws IOException {
        List<MultipartFile> documents = processFiles(files);
        return landMarkService.add(documents, landMarkDto);
    }

    @Override
    public ResponseEntity<String> editLandmark(MultipartFile[] files, LandMarkDto landMarkDto) throws IOException {
        List<MultipartFile> documents = processFiles(files);
        return landMarkService.edit(documents, landMarkDto);
    }

    @Override
    public ResponseEntity<List<GetLandMarkDto>> getAllLandmarks() {
        return landMarkService.getAll();
    }

    private List<MultipartFile> processFiles(MultipartFile[] files) {
        List<MultipartFile> documents = new ArrayList<>();
        if (files != null) {
            for (MultipartFile f : files) {
                if (!f.isEmpty()) {
                    documents.add(f);
                }
            }
        }
        return documents;
    }
}
