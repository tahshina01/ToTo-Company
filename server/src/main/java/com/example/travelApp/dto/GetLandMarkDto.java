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
public class GetLandMarkDto {
    private int id;
    private String name;
    private String type;
    private String location;
    private String description;
    private List<Integer> prevImages;
    private List<FileDto> images;
}
