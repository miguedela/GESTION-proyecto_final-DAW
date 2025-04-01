package com.gestion.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.gestion.backend.dto.UserDTO;
import com.gestion.backend.entity.OurUser;
import com.gestion.backend.exception.UserNotFoundException;
import com.gestion.backend.repository.UserRepository;
import com.gestion.backend.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	@Override
	public List<UserDTO> getAllUser() {
		return userRepository.findAll().stream()
				.map(user -> new UserDTO(user.getName(), user.getSurnames(), user.getEmail(), user.getTelephone(),
						user.getRole(), user.isEmailVerified(), user.isEmailNotifications(), user.getCreationDate()))
				.collect(Collectors.toList());
	}

	public UserDTO getUserById(Long id) {
		OurUser user = userRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException("Usuario no encontrado con ID: " + id));
		return new UserDTO(user.getName(), user.getSurnames(), user.getEmail(), user.getTelephone(), user.getRole(),
				user.isEmailVerified(), user.isEmailNotifications(), user.getCreationDate());
	}

	@Override
	public UserDTO getUserByEmail(String email) {
		OurUser user = userRepository.findByEmail(email)
				.orElseThrow(() -> new UserNotFoundException("Usuario no encontrado con email: " + email));

		return UserDTO.builder().name(user.getName()).surnames(user.getSurnames()).email(user.getEmail())
				.role(user.getRole()).emailVerified(user.isEmailVerified())
				.emailNotifications(user.isEmailNotifications()).creationDate(user.getCreationDate()).build();
	}

	public void deleteUser(Long id) {
		if (!userRepository.existsById(id)) {
			throw new UserNotFoundException("Usuario no encontrado con ID: " + id);
		}
		userRepository.deleteById(id);
	}

}
