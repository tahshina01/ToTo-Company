package com.example.travelApp.models;

import com.example.travelApp.enums.RoomType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "hotel_rooms")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HotelRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    private int roomNumber;

    @Enumerated(EnumType.STRING)
    private RoomType roomType;

    private int price;
    private String description;
}
