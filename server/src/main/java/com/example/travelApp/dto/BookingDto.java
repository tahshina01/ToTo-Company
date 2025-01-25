package com.example.travelApp.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookingDto {
    private int id;
    private int hotelId;
    private int roomId;
    private String userId;
    private String fromDate;
    private String toDate;
    private int totalAmount;
}
