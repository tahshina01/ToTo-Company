package com.example.travelApp.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "hotel_ratings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HotelRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private Double rating;
}
