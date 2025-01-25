package com.example.travelApp.services.impl;

import com.example.travelApp.dto.*;
import com.example.travelApp.models.*;
import com.example.travelApp.repositories.*;
import com.example.travelApp.services.HotelService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
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
    @Autowired
    private final HotelRoomRepository hotelRoomRepository;
    @Autowired
    private final RoomImageRepository roomImageRepository;
    @Autowired
    private final HotelBookingsRepository hotelBookingsRepository;

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
                HotelDto hotelDto = HotelDto.builder()
                        .id(hotel.getId())
                        .name(hotel.getName())
                        .address(hotel.getAddress())
                        .mobile(hotel.getMobile())
                        .image(hotel.getImage())
                        .rating(rating != null ? rating : -1)
                        .build();
                hotelDtoList.add(hotelDto);
            }
        }
        return ResponseEntity.ok(hotelDtoList);
    }

    @Override
    @Transactional
    public ResponseEntity<String> regHotel(List<MultipartFile> documents, RegHotelDto regHotelDto) throws IOException {
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
            HotelDocument hotelDocument = HotelDocument.builder()
                    .hotel(savedHotel)
                    .data(document.getBytes())
                    .build();
            hotelDocumentRepository.save(hotelDocument);
        }
        return ResponseEntity.ok("Registered successfully");
    }

    @Override
    public ResponseEntity<String> editHotel(HotelDto hotelDto) {
        Hotel existingHotel = hotelRepository.findById(hotelDto.getId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        if (existingHotel != null) {
            if (hotelDto.getImage() == null) {
                hotelDto.setImage(existingHotel.getImage());
            }
            Hotel hotel = new Hotel(hotelDto.getId(), hotelDto.getName(), existingHotel.getOwner(), hotelDto.getAddress(), hotelDto.getMobile(), existingHotel.getRegDate(), hotelDto.getImage());
            hotelRepository.save(hotel);
            return ResponseEntity.ok("Hotel updated");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<String> addRoom(List<MultipartFile> documents, RoomDto roomDto) throws IOException {
        Optional<Hotel> hotel = hotelRepository.findById(roomDto.getHotelId());
        HotelRoom room = HotelRoom.builder()
                .hotel(hotel.get())
                .roomNumber(roomDto.getRoomNumber())
                .roomType(roomDto.getRoomType())
                .price(roomDto.getPrice())
                .description(roomDto.getDescription())
                .build();

        hotelRoomRepository.save(room);

        for (MultipartFile document : documents) {
            RoomImage roomImage = RoomImage.builder()
                    .hotelRoom(room)
                    .data(document.getBytes())
                    .build();
            roomImageRepository.save(roomImage);
        }
        return ResponseEntity.ok("Room added successfully");
    }

    @Override
    public ResponseEntity<List<GetRoomDto>> getRoomsByHotelId(int hotelId) {
        List<HotelRoom> rooms = hotelRoomRepository.findByHotelId(hotelId);
        List<GetRoomDto> roomDtoList = new ArrayList<>();
        for (HotelRoom room : rooms) {
            List<RoomImage> images = roomImageRepository.findByHotelRoomId(room.getId());
            List<FileDto> imageList = new ArrayList<>();
            for (RoomImage image : images) {
                FileDto fileDto = FileDto.builder()
                        .id(image.getId())
                        .data(image.getData())
                        .fileType("image")
                        .build();
                imageList.add(fileDto);
            }
            GetRoomDto roomDto = GetRoomDto.builder()
                    .id(room.getId())
                    .roomNumber(room.getRoomNumber())
                    .hotelId(room.getHotel().getId())
                    .roomType(room.getRoomType())
                    .price(room.getPrice())
                    .description(room.getDescription())
                    .images(imageList)
                    .build();
            roomDtoList.add(roomDto);
        }
        return ResponseEntity.ok(roomDtoList);
    }

    @Override
    public ResponseEntity<String> editRoom(List<MultipartFile> documents, RoomDto roomDto) throws IOException {
        Optional<Hotel> hotel = hotelRepository.findById(roomDto.getHotelId());
        HotelRoom room = HotelRoom.builder()
                .id(roomDto.getId())
                .hotel(hotel.get())
                .roomNumber(roomDto.getRoomNumber())
                .roomType(roomDto.getRoomType())
                .price(roomDto.getPrice())
                .description(roomDto.getDescription())
                .build();
        hotelRoomRepository.save(room);

        List<Integer> prevAttachments = roomImageRepository.getPrevFilesByRoomId(roomDto.getId());
        for (Integer prevAttachment : prevAttachments) {
            if (!roomDto.getPrevImages().contains(prevAttachment)) {
                roomImageRepository.deleteById(prevAttachment);
            }
        }

        for (MultipartFile document : documents) {
            RoomImage roomImage = RoomImage.builder()
                    .hotelRoom(room)
                    .data(document.getBytes())
                    .build();
            roomImageRepository.save(roomImage);
        }

        return ResponseEntity.ok("Room updated successfully");
    }

    @Override
    public ResponseEntity<List<GetRoomDto>> getUnbookedRooms(int hotelId, String fromDate, String toDate) {
        try {
            // Parse the dates from strings to Timestamp
            System.out.println("service");
            Timestamp fromTimestamp = Timestamp.valueOf(fromDate);
            Timestamp toTimestamp = Timestamp.valueOf(toDate);
            System.out.println("service format");

            // Fetch all rooms for the given hotel
            List<HotelRoom> rooms = hotelRoomRepository.findByHotelId(hotelId);
            List<GetRoomDto> roomDtoList = new ArrayList<>();

            for (HotelRoom room : rooms) {
                System.out.println("before query");
                // Check if the room is booked within the given date range
                boolean isBooked = hotelBookingsRepository.existsByRoomIdAndDateRange(
                        room.getId(),
                        fromTimestamp,
                        toTimestamp
                );
                System.out.println("after query");

                if (!isBooked) { // If not booked, include it in the result
                    List<RoomImage> images = roomImageRepository.findByHotelRoomId(room.getId());
                    List<FileDto> imageList = new ArrayList<>();
                    for (RoomImage image : images) {
                        FileDto fileDto = FileDto.builder()
                                .id(image.getId())
                                .data(image.getData())
                                .fileType("image")
                                .build();
                        imageList.add(fileDto);
                    }
                    GetRoomDto roomDto = GetRoomDto.builder()
                            .id(room.getId())
                            .roomNumber(room.getRoomNumber())
                            .hotelId(room.getHotel().getId())
                            .roomType(room.getRoomType())
                            .price(room.getPrice())
                            .description(room.getDescription())
                            .images(imageList)
                            .build();
                    roomDtoList.add(roomDto);
                }
            }
            return ResponseEntity.ok(roomDtoList);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @Override
    public ResponseEntity<String> booking(BookingDto bookingDto) {
        HotelBookings booking = HotelBookings.builder()
                .roomId(bookingDto.getRoomId())
                .userId(bookingDto.getUserId())
                .hotelId(bookingDto.getHotelId())
                .fromDate(Timestamp.valueOf(bookingDto.getFromDate()))
                .toDate(Timestamp.valueOf(bookingDto.getToDate()))
                .totalAmount(bookingDto.getTotalAmount())
                .build();
        hotelBookingsRepository.save(booking);
        return ResponseEntity.ok("Booked successfully");
    }

    @Override
    public ResponseEntity<List<AdminHotelDto>> getUnregisteredHotels() {
        List<Hotel> hotels = hotelRepository.findByRegDateIsNull();
        List<AdminHotelDto> hotelDtoList = new ArrayList<>();
        for (Hotel hotel : hotels) {
            List<HotelDocument> documents = hotelDocumentRepository.findByHotelId(hotel.getId());
            List<FileDto> documentList = new ArrayList<>();
            for (HotelDocument document : documents) {
                FileDto fileDto = FileDto.builder()
                        .id(document.getId())
                        .data(document.getData())
                        .fileType("image")
                        .build();
                documentList.add(fileDto);
            }
            AdminHotelDto hotelDto = AdminHotelDto.builder()
                    .id(hotel.getId())
                    .name(hotel.getName())
                    .owner(hotel.getOwner().getId())
                    .address(hotel.getAddress())
                    .mobile(hotel.getMobile())
                    .rating(-1)
                    .image(hotel.getImage())
                    .documents(documentList)
                    .build();
            hotelDtoList.add(hotelDto);
        }
        return ResponseEntity.ok(hotelDtoList);
    }

    @Override
    @Transactional
    public ResponseEntity<String> acceptRegistration(int id) {
        Optional<Hotel> hotel = hotelRepository.findById(id);
        if (hotel.isPresent()) {
            hotel.get().setRegDate(new Timestamp(System.currentTimeMillis()));
            hotelRepository.save(hotel.get());
            hotelDocumentRepository.deleteByHotelId(id);
            return ResponseEntity.ok("Hotel registration accepted");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    @Transactional
    public ResponseEntity<String> rejectRegistration(int id) {
        hotelDocumentRepository.deleteByHotelId(id);
        hotelRepository.deleteById(id);
        return ResponseEntity.ok("Hotel registration rejected");
    }

}
