package com.example.travelApp.dto;

import com.example.travelApp.enums.RoomType;
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
public class BookingDto2 {
    private int id;
    private int hotelId;
    private String hotelName;
    private String hotelAddress;
    private byte[] image;
    private RoomType roomType;
    private String fromDate;
    private String toDate;
    private int totalAmount;
}
