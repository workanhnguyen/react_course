package com.example.server.services;

import com.example.server.entities.User;

import java.util.List;
import java.util.Map;

public interface UserService {
    List<User> findAll(Map<String, Object> params);
    User saveUser(User user);
    User editUser(User user);
    void deleteUser(String email);
}
