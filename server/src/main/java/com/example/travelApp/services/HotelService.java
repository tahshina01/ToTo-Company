package com.example.travelApp.services;

import com.example.travelApp.dto.FileDto;
import com.example.travelApp.dto.HotelDto;
import com.example.travelApp.dto.RegHotelDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface HotelService {
    ResponseEntity<List<HotelDto>> getHotels();

    ResponseEntity<List<HotelDto>> getHotelsByUserId(String userId);

    ResponseEntity<String> regHotel(List<MultipartFile> documents, RegHotelDto regHotelDto) throws IOException;
}
