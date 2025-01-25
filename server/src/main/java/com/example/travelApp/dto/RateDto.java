package com.example.travelApp.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RateDto {
    private int bookingId;
    private double rating;
    private int hotelId;
    private String userId;
}
