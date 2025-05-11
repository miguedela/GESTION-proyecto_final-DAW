package com.gestion.backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.gestion.backend.dto.RestaurantDTO;
import com.gestion.backend.dto.UserDTO;
import com.gestion.backend.entity.OurUser;
import com.gestion.backend.entity.Restaurant;
import com.gestion.backend.enums.Roles;
import com.gestion.backend.exception.DuplicateResourceException;
import com.gestion.backend.exception.ResourceNotFoundException;
import com.gestion.backend.repository.RestaurantStaffRepository;
import com.gestion.backend.repository.UserRepository;
import com.gestion.backend.service.UserService;
import com.gestion.backend.specification.UserSpecifications;
import com.gestion.backend.utility.SpecificationBuilder;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final RestaurantStaffRepository restaurantStaffRepository;

	public Page<UserDTO> getUsers(Pageable pageable, Map<String, String> filters) {
		SpecificationBuilder<OurUser> builder = new SpecificationBuilder<OurUser>()
				.with("role", key -> UserSpecifications.filterByRole(filters))
				.with("general", key -> UserSpecifications.filterByGeneral(filters));

		Specification<OurUser> spec = builder.build(filters);

		return userRepository.findAll(spec, pageable)
				.map(user -> UserDTO.builder().id(user.getId()).name(user.getName()).surnames(user.getSurnames())
						.email(user.getEmail()).telephone(user.getTelephone()).role(user.getRole().name())
						.creationDate(user.getCreationDate()).lastModifiedDate(user.getLastModifiedDate()).build());
	}

	public UserDTO getUserById(Long id) {
		OurUser user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + id));

		UserDTO.UserDTOBuilder userBuilder = UserDTO.builder().id(user.getId()).name(user.getName())
				.surnames(user.getSurnames()).email(user.getEmail()).telephone(user.getTelephone())
				.role(user.getRole().name()).creationDate(user.getCreationDate())
				.lastModifiedDate(user.getLastModifiedDate());

		if (user.getRole() == Roles.STAFF) {
			List<RestaurantDTO> restaurants = restaurantStaffRepository.findAllByStaffId(id).stream().map(rs -> {
				Restaurant restaurant = rs.getRestaurant();
				return RestaurantDTO.builder().id(restaurant.getId()).name(restaurant.getName())
						.description(restaurant.getDescription()).address(restaurant.getAddress())
						.email(restaurant.getEmail()).phone(restaurant.getPhone())
						.openingHours(restaurant.getOpeningHours()).creationDate(restaurant.getCreationDate())
						.lastModifiedDate(restaurant.getLastModifiedDate()).build();
			}).toList();

			userBuilder.restaurants(restaurants);
		}

		return userBuilder.build();
	}

	@Override
	public UserDTO getUserByEmail(String email) {
		OurUser user = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con email: " + email));

		return UserDTO.builder().name(user.getName()).surnames(user.getSurnames()).email(user.getEmail())
				.role(user.getRole().name()).creationDate(user.getCreationDate())
				.lastModifiedDate(user.getLastModifiedDate()).build();
	}

	@Override
	public UserDTO updateUser(UserDTO userDTO) {
		OurUser user = userRepository.findById(userDTO.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + userDTO.getId()));

		Optional<OurUser> existingUserOpt = userRepository.findByEmail(userDTO.getEmail());
		if (existingUserOpt.isPresent() && !existingUserOpt.get().getId().equals(userDTO.getId()))
			throw new DuplicateResourceException("El email ya está registrado");

		Optional<OurUser> existingUserByPhone = userRepository.findByTelephone(userDTO.getTelephone());
		if (existingUserByPhone.isPresent() && !existingUserByPhone.get().getId().equals(userDTO.getId()))
			throw new DuplicateResourceException("El número de teléfono ya está registrado");

		user.setName(userDTO.getName());
		user.setSurnames(userDTO.getSurnames());
		user.setEmail(userDTO.getEmail());
		user.setTelephone(userDTO.getTelephone());
		user.setRole(Roles.valueOf(userDTO.getRole()));
		user.setLastModifiedDate(LocalDateTime.now());

		OurUser updatedUser = userRepository.save(user);

		return UserDTO.builder().id(updatedUser.getId()).name(updatedUser.getName()).surnames(updatedUser.getSurnames())
				.email(updatedUser.getEmail()).telephone(updatedUser.getTelephone()).role(updatedUser.getRole().name())
				.creationDate(updatedUser.getCreationDate()).lastModifiedDate(updatedUser.getLastModifiedDate())
				.build();
	}

	@Override
	public void deleteUser(Long id) {
		if (!userRepository.existsById(id)) {
			throw new ResourceNotFoundException("Usuario no encontrado con ID: " + id);
		}
		userRepository.deleteById(id);
	}

}
