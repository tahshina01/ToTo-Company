package com.example.travelApp.services;

import com.example.travelApp.dto.HotelDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface HotelService {
    ResponseEntity<List<HotelDto>> getHotels();
}
