package com.example.travelApp.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UpdateProfileDto {
    private String id;
    private String name;
    private String address;
    private String mobile;
    private String gender;
    private Integer age;
    private byte[] profilePic;
}
