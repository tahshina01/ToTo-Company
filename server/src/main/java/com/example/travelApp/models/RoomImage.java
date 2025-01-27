package com.example.travelApp.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "room_image")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RoomImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_room_id")
    private HotelRoom hotelRoom;

    @Lob
    @Column(name = "data", columnDefinition = "LONGBLOB")
    private byte[] data;
}
