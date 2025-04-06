package com.gestion.backend.service;

import com.gestion.backend.dto.AuthResponseDTO;
import com.gestion.backend.dto.RegisterDTO;
import com.gestion.backend.dto.UserDTO;

public interface AuthService {

    /**
     * Registra un nuevo usuario en el sistema.
     * 
     * @param registrationRequest Datos necesarios para registrar el usuario.
     * @return AuthResponseDTO Respuesta con el token y detalles del usuario.
     */
    public AuthResponseDTO register(RegisterDTO registrationRequest);

    /**
     * Inicia sesión de un usuario con sus credenciales.
     * 
     * @param email Correo electrónico del usuario.
     * @param password Contraseña del usuario.
     * @return AuthResponseDTO Respuesta con el token y detalles del usuario.
     */
    public AuthResponseDTO login(String email, String password);

    /**
     * Actualiza los datos del usuario logueado.
     * 
     * @param userDTO Datos actualizados del usuario.
     * @return AuthResponseDTO Respuesta con el token y detalles del usuario actualizado.
     */
    public AuthResponseDTO updateMyData(UserDTO userDTO, String newPassword);
}
