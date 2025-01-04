package com.example.travelApp.services.impl;

import com.example.travelApp.dto.HotelDto;
import com.example.travelApp.models.Hotel;
import com.example.travelApp.repositories.HotelRatingRepository;
import com.example.travelApp.repositories.HotelRepository;
import com.example.travelApp.services.HotelService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HotelServiceImpl implements HotelService {
    @Autowired
    private final HotelRepository hotelRepository;
    @Autowired
    private final HotelRatingRepository hotelRatingRepository;

    @Override
    @Transactional
    public ResponseEntity<List<HotelDto>> getHotels() {
        List<Hotel> hotels = hotelRepository.findAll();
        List<HotelDto> hotelDtoList = new ArrayList<>();
        for (Hotel hotel : hotels) {
            HotelDto hotelDto = HotelDto
                    .builder()
                    .id(hotel.getId())
                    .name(hotel.getName())
                    .address(hotel.getAddress())
                    .mobile(hotel.getMobile())
                    .image(hotel.getImage())
                    .build();
            Double rating = hotelRatingRepository.getHotelRating(hotel.getId());
            hotelDto.setRating(rating != null ? rating : -1);
            hotelDtoList.add(hotelDto);
        }
        return ResponseEntity.ok(hotelDtoList);
    }
}
