package com.example.travelApp.repositories;

import com.example.travelApp.models.RoomImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomImageRepository extends JpaRepository<RoomImage, Integer> {
    List<RoomImage> findByHotelRoomId(int id);

    @Query("SELECT r.id FROM RoomImage r WHERE r.hotelRoom.id = :roomId")
    List<Integer> getPrevFilesByRoomId(int roomId);
}
