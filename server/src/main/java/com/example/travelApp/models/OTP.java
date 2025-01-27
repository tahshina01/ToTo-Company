package com.example.travelApp.models;

import com.example.travelApp.enums.OtpType;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "otp")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OTP {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String userEmail;
    private String otp;
    @Enumerated(EnumType.STRING)
    private OtpType type;
    private Timestamp timestamp;
}
