package com.example.travelApp.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegHotelDto {
    private String name;
    private String owner;
    private String address;
    private String mobile;
    private byte[] image;
    private List<MultipartFile> documents;
}
