package com.example.travelApp.dto;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AdminHotelDto {
    private int id;
    private String name;
    private String owner;
    private String address;
    private String mobile;
    private double rating;
    private byte[] image;
    private List<FileDto> documents;
}
