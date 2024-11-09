package com.example.travelApp.dto;

import com.example.travelApp.enums.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthResponse {
  private String token;
  @Enumerated(EnumType.STRING)
  private Role role;
  private String error;
}
