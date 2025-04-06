package com.gestion.backend.service.impl;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.gestion.backend.dto.UserDTO;
import com.gestion.backend.entity.OurUser;
import com.gestion.backend.enums.Roles;
import com.gestion.backend.exception.UserNotFoundException;
import com.gestion.backend.repository.UserRepository;
import com.gestion.backend.service.UserService;
import com.gestion.backend.specification.UserSpecifications;
import com.gestion.backend.utility.SpecificationBuilder;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	public Page<UserDTO> getUsers(Pageable pageable, Map<String, String> filters) {
        SpecificationBuilder<OurUser> builder = new SpecificationBuilder<OurUser>()
            .with("role", key -> UserSpecifications.filterByRole(filters))
            .with("general", key -> UserSpecifications.filterByGeneral(filters));

        Specification<OurUser> spec = builder.build(filters);

        return userRepository.findAll(spec, pageable)
            .map(user -> new UserDTO(
            	user.getId(),
                user.getName(),
                user.getSurnames(),
                user.getEmail(),
                user.getTelephone(),
                user.getRole().name(),
                user.getCreationDate(),
                user.getLastModifiedDate()
            ));
    }

	public UserDTO getUserById(Long id) {
		OurUser user = userRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException("Usuario no encontrado con ID: " + id));
		return new UserDTO(user.getId(), user.getName(), user.getSurnames(), user.getEmail(), user.getTelephone(),
				user.getRole().name(), user.getCreationDate(), user.getLastModifiedDate());
	}
	
	@Override
	public UserDTO getUserByEmail(String email) {
	    OurUser user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado con email: " + email));

	    return UserDTO.builder()
	            .name(user.getName())
	            .surnames(user.getSurnames())
	            .email(user.getEmail())
	            .role(user.getRole().name())
	            .creationDate(user.getCreationDate())
	            .lastModifiedDate(user.getLastModifiedDate())
	            .build();
	}

	@Override
	public UserDTO updateUser(UserDTO userDTO) {
	    OurUser user = userRepository.findById(userDTO.getId())
	            .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado con ID: " + userDTO.getId()));

	    user.setName(userDTO.getName());
	    user.setSurnames(userDTO.getSurnames());
	    user.setEmail(userDTO.getEmail());
	    user.setTelephone(userDTO.getTelephone());
	    user.setRole(Roles.valueOf(userDTO.getRole()));
	    user.setLastModifiedDate(LocalDateTime.now());

	    OurUser updatedUser = userRepository.save(user);

	    return new UserDTO(
	            updatedUser.getId(),
	            updatedUser.getName(),
	            updatedUser.getSurnames(),
	            updatedUser.getEmail(),
	            updatedUser.getTelephone(),
	            updatedUser.getRole().name(),
	            updatedUser.getCreationDate(),
	            updatedUser.getLastModifiedDate()
	    );
	}
	
	@Override
	public void deleteUser(Long id) {
		if (!userRepository.existsById(id)) {
			throw new UserNotFoundException("Usuario no encontrado con ID: " + id);
		}
		userRepository.deleteById(id);
	}

	
}
