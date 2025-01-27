package com.example.travelApp.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "transport_company")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TransportCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String name;
}
