package com.example.travelApp.repositories;

import com.example.travelApp.models.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {
    Optional<Hotel> findById(Integer id);

    List<Hotel> findByOwnerId(String owner);

    @Query("SELECT h FROM Hotel h WHERE h.regDate IS NULL")
    List<Hotel> findByRegDateIsNull();
}
