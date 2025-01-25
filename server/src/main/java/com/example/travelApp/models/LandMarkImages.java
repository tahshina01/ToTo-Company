package com.example.travelApp.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "land_mark_images")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LandMarkImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "land_mark_id")
    private LandMark landMark;

    @Lob
    @Column(name = "data", columnDefinition = "LONGBLOB")
    private byte[] data;
}
