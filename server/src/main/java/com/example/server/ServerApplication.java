package com.example.server;

import com.example.server.entities.User;
import com.example.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Optional;

@SpringBootApplication
@RequiredArgsConstructor
public class ServerApplication implements CommandLineRunner {
	private final UserRepository userRepository;


	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Optional<User> exampleUser1 = userRepository.findByEmail("anh@gmail.com");
		Optional<User> exampleUser2 = userRepository.findByEmail("dat@gmail.com");

		if (exampleUser1.isEmpty()) {
			User user = new User();
			user.setEmail("anh@gmail.com");
			user.setFirstName("Anh");
			user.setLastName("Nguyen");
			userRepository.save(user);
		}
		if (exampleUser2.isEmpty()) {
			User user = new User();
			user.setEmail("dat@gmail.com");
			user.setFirstName("Dat");
			user.setLastName("Luong");
			userRepository.save(user);
		}
	}
}
