package com.gestion.backend.controller;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.backend.dto.AuthResponseDTO;
import com.gestion.backend.dto.LoginDTO;
import com.gestion.backend.dto.RegisterDTO;
import com.gestion.backend.dto.UserDTO;
import com.gestion.backend.service.AuthService;
import com.gestion.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final AuthService authService;
    private final UserService userService;

    @GetMapping("/admin/users")
    public ResponseEntity<Page<UserDTO>> getUsers(
            @PageableDefault(page = 0, size = 10)
            @SortDefault.SortDefaults({
                @SortDefault(sort = "creationDate", direction = Sort.Direction.DESC)
            }) Pageable pageable,
            @RequestParam Map<String, String> filters
    ) {
        filters.remove("size");
        filters.remove("page");
        filters.remove("sort");

        return ResponseEntity.ok(userService.getUsers(pageable, filters));
    }

    @GetMapping("/admin/{userId}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getMyProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @PostMapping("/auth/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody RegisterDTO reg) {
        return ResponseEntity.ok(authService.register(reg));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO req) {
        return ResponseEntity.ok(authService.login(req.getEmail(), req.getPassword()));
    }

    @DeleteMapping("/admin/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/profile/update")
    public ResponseEntity<AuthResponseDTO> updateMyData(@RequestBody UserDTO userDTO, @RequestParam(required = false) String currentPassword) {
        return ResponseEntity.ok(authService.updateMyData(userDTO, currentPassword));
    }

    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long userId, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUser(userDTO));
    }
}
