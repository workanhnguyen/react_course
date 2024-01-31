package com.example.server.services.impl;

import com.example.server.entities.User;
import com.example.server.exceptions.UserExistedExeption;
import com.example.server.exceptions.UserNotFoundException;
import com.example.server.repositories.UserRepository;
import com.example.server.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public List<User> findAll(Map<String, Object> params) {
        if (params.isEmpty())
            return userRepository.findAll();
        else if (params.containsKey("email")) {
            Optional<User> user = userRepository.findByEmail(params.get("email").toString());
            return user.map(Collections::singletonList).orElseGet(ArrayList::new);
        }
        return new ArrayList<>();
    }

    @Override
    public User saveUser(User user) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
        if (optionalUser.isEmpty())
            return userRepository.save(user);
        throw new UserExistedExeption("Email is already taken.");
    }

    @Override
    public User editUser(User user) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setFirstName(user.getFirstName());
            existingUser.setLastName(user.getLastName());

            return userRepository.save(existingUser);
        }
        throw new UserNotFoundException("User is not found.");
    }

    @Override
    public void deleteUser(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty())
            throw new UserNotFoundException("User is not found.");
        else
            userRepository.delete(optionalUser.get());
    }
}
