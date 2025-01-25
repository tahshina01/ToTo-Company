package com.example.travelApp.models;

import com.example.travelApp.enums.RoomType;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "plane_ticket")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PlaneTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String userId;
    int vehicle_id;
    Timestamp datetime;
    String start_place;
    String end_place;
    float price;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private TransportCompany transportCompany;
    String seat_class;
}