package com.gestion.backend.dto;

import com.gestion.backend.enums.Roles;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterDTO {
	
    private String name;
    private String surnames;
    private String telephone;
    private String email;
    private String password;
    private Roles role;
    
}
