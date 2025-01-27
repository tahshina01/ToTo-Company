package com.example.travelApp.dto;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookingData {
    List<BookingDto2> currentBookings;
    List<BookingDto2> pastBookings;
}
