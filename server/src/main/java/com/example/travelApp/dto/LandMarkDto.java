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
public class LandMarkDto {
    private int id;
    private String name;
    private String type;
    private String location;
    private String description;
    private List<Integer> prevImages;
    private List<MultipartFile> images;
}

