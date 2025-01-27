package com.example.travelApp.dto;

import lombok.*;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TicketDto {
    int id;
    String userId;
    int vehicle_id;
    String datetime;
    String from;
    String to;
    float price;
    public String vehicle_type;
    String seat_class;
}
