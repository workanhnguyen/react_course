package com.example.server.exceptions;

public class UserExistedExeption extends RuntimeException {
    public UserExistedExeption(String message) {
        super(message);
    }
}
