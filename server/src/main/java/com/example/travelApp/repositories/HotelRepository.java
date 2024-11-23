package com.example.travelApp.repositories;

import com.example.travelApp.models.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HotelRepository extends JpaRepository<Hotel, Integer> {
    Optional<Hotel> findById(Integer id);
}
