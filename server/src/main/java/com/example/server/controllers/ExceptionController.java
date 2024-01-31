package com.example.server.controllers;

import com.example.server.exceptions.InvalidApiEndpointException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/**")
public class ExceptionController {
    @RequestMapping
    public ResponseEntity<?> handleInvalidApiRequest() {
        throw new InvalidApiEndpointException("Endpoint is not found.");
    }
}
