package com.example.travelApp.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class HotelDto {
    private int id;
    private String name;
    private String address;
    private String mobile;
    private byte[] image;
    private double rating;
}
