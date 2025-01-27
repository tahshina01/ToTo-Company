package com.example.travelApp.models;


import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "bus_ticket")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BusTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String userId;
    int vehicle_id;
    String datetime;
    String start_place;
    String end_place;
    float price;

    String seat_class;
}
