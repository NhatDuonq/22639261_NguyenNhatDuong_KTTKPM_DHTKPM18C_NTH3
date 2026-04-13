package com.example.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEventDTO {
    private Long id;
    private String userName;
    private String email;
    private String eventType; // Sẽ lưu là "USER_REGISTERED"
}