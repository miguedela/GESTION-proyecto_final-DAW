package com.gestion.backend.service;

import java.util.List;

import com.gestion.backend.dto.UserDTO;

public interface UserService {
	public List<UserDTO> getAllUser();

	public UserDTO getUserById(Long id);

	UserDTO getUserByEmail(String email);

	public void deleteUser(Long id);
}
