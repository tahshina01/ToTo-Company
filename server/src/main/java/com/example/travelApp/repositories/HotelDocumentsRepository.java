package com.example.travelApp.repositories;

import com.example.travelApp.models.HotelDocument;
import com.example.travelApp.models.RoomImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelDocumentsRepository extends JpaRepository<HotelDocument, Integer> {
}
