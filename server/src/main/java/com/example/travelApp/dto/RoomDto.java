package com.example.travelApp.dto;

import com.example.travelApp.enums.RoomType;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RoomDto {
    private int id;
    private int roomNumber;
    private int hotelId;
    private RoomType roomType;
    private int price;
    private String description;
    private List<Integer> prevImages;
    private List<MultipartFile> images;
}
