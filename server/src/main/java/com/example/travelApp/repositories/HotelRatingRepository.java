package com.example.travelApp.repositories;

import com.example.travelApp.models.HotelRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRatingRepository extends JpaRepository<HotelRating, Integer> {
    @Query(value = "SELECT AVG(rating) FROM hotel_ratings WHERE hotel_id = :hotelId", nativeQuery = true)
    Double getHotelRating(@Param("hotelId") int hotelId);
}
