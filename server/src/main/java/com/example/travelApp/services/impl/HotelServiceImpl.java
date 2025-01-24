package com.example.travelApp.services.impl;

import com.example.travelApp.dto.FileDto;
import com.example.travelApp.dto.HotelDto;
import com.example.travelApp.dto.RegHotelDto;
import com.example.travelApp.models.Hotel;
import com.example.travelApp.models.HotelDocument;
import com.example.travelApp.models.User;
import com.example.travelApp.repositories.HotelDocumentsRepository;
import com.example.travelApp.repositories.HotelRatingRepository;
import com.example.travelApp.repositories.HotelRepository;
import com.example.travelApp.repositories.UserRepository;
import com.example.travelApp.services.HotelService;
import jakarta.transaction.Transactional;
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
public class HotelServiceImpl implements HotelService {
    @Autowired
    private final HotelRepository hotelRepository;
    @Autowired
    private final HotelDocumentsRepository hotelDocumentRepository;
    @Autowired
    private final HotelRatingRepository hotelRatingRepository;
    @Autowired
    private final UserRepository userRepository;

    @Override
    @Transactional
    public ResponseEntity<List<HotelDto>> getHotels() {
        List<Hotel> hotels = hotelRepository.findAll();
        List<HotelDto> hotelDtoList = new ArrayList<>();
        for (Hotel hotel : hotels) {
            if(hotel.getRegDate() == null) continue;
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

    @Override
    public ResponseEntity<List<HotelDto>> getHotelsByUserId(String userId) {
        List<Hotel> hotels = hotelRepository.findByOwnerId(userId);
        List<HotelDto> hotelDtoList = new ArrayList<>();
        for (Hotel hotel : hotels) {
            if(hotel.getRegDate() != null) {
                Double rating = hotelRatingRepository.getHotelRating(hotel.getId());
                HotelDto hotelDto = new HotelDto(hotel.getId(), hotel.getName(), hotel.getAddress(), hotel.getMobile(), hotel.getImage(), rating != null ? rating : -1);
                hotelDtoList.add(hotelDto);
            }
        }
        return ResponseEntity.ok(hotelDtoList);
    }

    @Override
    @Transactional
    public ResponseEntity<String> regHotel(List<MultipartFile> documents, RegHotelDto regHotelDto) throws IOException {
        System.out.println("Inside service");
        Optional<User> user = userRepository.findById(regHotelDto.getOwner());
        Hotel hotel = Hotel.builder()
                .name(regHotelDto.getName())
                .address(regHotelDto.getAddress())
                .mobile(regHotelDto.getMobile())
                .image(regHotelDto.getImage()).
                 owner(user.get())
                .regDate(null)
                .build();

        Hotel savedHotel = hotelRepository.save(hotel);

        for (MultipartFile document : documents) {
            System.out.println("Inside loop");
            HotelDocument hotelDocument = HotelDocument.builder()
                    .hotel(savedHotel)
                    .data(document.getBytes())
                    .build();
            hotelDocumentRepository.save(hotelDocument);
        }
        return ResponseEntity.ok("Registered successfully");
    }
}
