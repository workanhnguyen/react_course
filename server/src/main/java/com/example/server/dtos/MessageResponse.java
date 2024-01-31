package com.example.server.dtos;

import lombok.Data;

@Data
public class MessageResponse {
    private int status;
    private String message;
    private Long timestamp;
}

