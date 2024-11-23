package com.example.travelApp.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "land_marks")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LandMark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String description;
    private String location;
    private String type;

    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    protected byte[] image;
}
