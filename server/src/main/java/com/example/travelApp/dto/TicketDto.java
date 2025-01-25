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
    Timestamp datetime;
    String from;
    String to;
    float price;
    public String vehicle_type;
    int owner_id;
    String seat_class;
}
