package com.example.travelApp.models;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "hotel_bookings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HotelBookings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int hotelId;
    private int roomId;
    private String userId;
    private Timestamp fromDate;
    private Timestamp toDate;
    private int totalAmount;
}
