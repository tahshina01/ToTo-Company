package com.example.travelApp.repositories;

import com.example.travelApp.models.HotelBookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface HotelBookingsRepository extends JpaRepository<HotelBookings, Integer> {
    @Query("SELECT CASE WHEN COUNT(hb) > 0 THEN true ELSE false END " +
            "FROM HotelBookings hb " +
            "WHERE hb.roomId = :roomId " +
            "AND ((hb.fromDate <= :toDate AND hb.toDate >= :fromDate))")
    boolean existsByRoomIdAndDateRange(@Param("roomId") int roomId,
                                       @Param("fromDate") Timestamp fromDate,
                                       @Param("toDate") Timestamp toDate);

    List<HotelBookings> findByUserId(String userId);
}
