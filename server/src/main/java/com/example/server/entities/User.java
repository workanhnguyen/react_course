package com.example.server.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 30)
    @NotEmpty
    private String firstName;
    @Column(nullable = false, length = 50)
    @NotEmpty
    private String lastName;
    @Column(nullable = false, unique = true)
    @NotEmpty
    @Email
    private String email;
}
