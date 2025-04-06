package com.gestion.backend.service;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gestion.backend.dto.UserDTO;

/**
 * Servicio de gestión de usuarios.
 */
public interface UserService {

    /**
     * Obtiene una página de usuarios con filtros aplicados.
     * 
     * @param pageable Paginación de los resultados.
     * @param filters Filtros para aplicar a la consulta.
     * @return Página de usuarios.
     */
    public Page<UserDTO> getUsers(Pageable pageable, Map<String, String> filters);

    /**
     * Obtiene un usuario por su ID.
     * 
     * @param id ID del usuario.
     * @return Usuario encontrado.
     */
    public UserDTO getUserById(Long id);

    /**
     * Obtiene un usuario por su correo electrónico.
     * 
     * @param email Correo electrónico del usuario.
     * @return Usuario encontrado.
     */
    UserDTO getUserByEmail(String email);
    
    /**
     * Actualiza los datos de un usuario.
     * 
     * @param user El objeto que contiene la información necesaria para actualizar los datos de un usuario.
     * @return Usuario actualizado.
     */
    public UserDTO updateUser(UserDTO user);

    /**
     * Elimina un usuario por su ID.
     * 
     * @param id ID del usuario.
     */
    public void deleteUser(Long id);

}
