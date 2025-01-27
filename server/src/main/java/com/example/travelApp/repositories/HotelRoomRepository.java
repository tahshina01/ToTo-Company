package com.example.travelApp.repositories;

import com.example.travelApp.models.HotelRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRoomRepository extends JpaRepository<HotelRoom, Integer> {

    List<HotelRoom> findByHotelId(int hotelId);
}
