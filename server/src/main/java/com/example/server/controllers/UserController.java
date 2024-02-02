package com.example.server.controllers;

import com.example.server.dtos.MessageResponse;
import com.example.server.entities.User;
import com.example.server.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getUsers(@RequestParam Map<String, Object> params) {
        return ResponseEntity.ok(userService.findAll(params));
    }

    @PostMapping("/new")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser(user));
    }

    @PatchMapping("/edit")
    public ResponseEntity<User> editUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.editUser(user));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestBody Map<String, Object> params) {
        MessageResponse msg = new MessageResponse();
        msg.setMessage("User deleted successfully.");
        msg.setStatus(HttpStatus.OK.value());
        msg.setTimestamp(new Date().getTime());

        userService.deleteUser(params.get("email").toString());
        return ResponseEntity.ok(msg);
    }
}
