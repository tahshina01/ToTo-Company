package com.example.travelApp.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "hotel_documents")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HotelDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    @Lob
    @Column(name = "data", columnDefinition = "LONGBLOB")
    private byte[] data;
}
