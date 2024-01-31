package com.example.server.exceptions;

import com.example.server.dtos.MessageResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {
    private final ObjectMapper objectMapper;

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleUserNotFoundException(UserNotFoundException ex) {
        MessageResponse exceptionResponse = new MessageResponse();
        exceptionResponse.setStatus(HttpStatus.NOT_FOUND.value());
        exceptionResponse.setMessage(ex.getMessage());
        exceptionResponse.setTimestamp(System.currentTimeMillis());

        return new ResponseEntity<>(objectMapper.convertValue(exceptionResponse, Map.class), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserExistedExeption.class)
    public ResponseEntity<?> handleUserExistedExeption(UserExistedExeption ex) {
        MessageResponse exceptionResponse = new MessageResponse();
        exceptionResponse.setStatus(HttpStatus.BAD_REQUEST.value());
        exceptionResponse.setMessage(ex.getMessage());
        exceptionResponse.setTimestamp(System.currentTimeMillis());

        return new ResponseEntity<>(objectMapper.convertValue(exceptionResponse, Map.class), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidApiEndpointException.class)
    public ResponseEntity<?> handleInvalidApiEndpointException(InvalidApiEndpointException ex) {
        MessageResponse exceptionResponse = new MessageResponse();
        exceptionResponse.setStatus(HttpStatus.NOT_FOUND.value());
        exceptionResponse.setMessage(ex.getMessage());
        exceptionResponse.setTimestamp(System.currentTimeMillis());

        return new ResponseEntity<>(objectMapper.convertValue(exceptionResponse, Map.class), HttpStatus.NOT_FOUND);
    }
}
