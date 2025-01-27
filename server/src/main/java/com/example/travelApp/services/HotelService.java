package com.example.travelApp.services;

import com.example.travelApp.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface HotelService {
    ResponseEntity<List<HotelDto>> getHotels();

    ResponseEntity<List<HotelDto>> getHotelsByUserId(String userId);

    ResponseEntity<String> regHotel(List<MultipartFile> documents, RegHotelDto regHotelDto) throws IOException;

    ResponseEntity<String> editHotel(HotelDto hotelDto);

    ResponseEntity<String> addRoom(List<MultipartFile> documents, RoomDto roomDto) throws IOException;

    ResponseEntity<List<GetRoomDto>> getRoomsByHotelId(int hotelId);

    ResponseEntity<String> editRoom(List<MultipartFile> documents, RoomDto roomDto) throws IOException;

    ResponseEntity<List<GetRoomDto>> getUnbookedRooms(int hotelId, String fromDate, String toDate);

    ResponseEntity<String> booking(BookingDto bookingDto);

    ResponseEntity<List<AdminHotelDto>> getUnregisteredHotels();

    ResponseEntity<String> acceptRegistration(int id);

    ResponseEntity<String> rejectRegistration(int id);

    ResponseEntity<BookingData> getBookingsByUserId(String userId);

    ResponseEntity<String> cancelBooking(int bookingId);

    ResponseEntity<String> rateHotel(RateDto rateDto);
}
