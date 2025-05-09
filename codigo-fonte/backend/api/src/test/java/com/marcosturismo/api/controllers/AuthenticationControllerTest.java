/*package com.marcosturismo.api.controllers;

import com.marcosturismo.api.domain.usuario.AuthenticationDTO;
import com.marcosturismo.api.domain.usuario.LoginResponseDTO;
import com.marcosturismo.api.domain.usuario.Usuario;
import com.marcosturismo.api.infra.security.TokenService;
import com.marcosturismo.api.repositories.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthenticationControllerTest {

    @InjectMocks
    private AuthenticationController authenticationController;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private TokenService tokenService;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private Authentication authentication;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldReturnBadRequest_WhenEmailOrPasswordAreNull() {
        AuthenticationDTO data = new AuthenticationDTO(null, "senha123");
        var response = authenticationController.login(data);
        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Email e senha são obrigatórios", response.getBody());
    }

    @Test
    void shouldReturnOk_WhenCredentialsAreValid() {
        AuthenticationDTO data = new AuthenticationDTO("usuario@email.com", "senha123");
        Usuario usuario = new Usuario();
        String token = "mocked-token";

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(usuario);
        when(tokenService.generateToken(usuario)).thenReturn(token);

        var response = authenticationController.login(data);

        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody() instanceof LoginResponseDTO);
        assertEquals(token, ((LoginResponseDTO) response.getBody()).token());
    }

    @Test
    void shouldReturnUnauthorized_WhenCredentialsAreInvalid() {
        AuthenticationDTO data = new AuthenticationDTO("usuario@email.com", "senha123");
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Credenciais inválidas"));

        var response = authenticationController.login(data);

        assertEquals(401, response.getStatusCodeValue());
        assertEquals("Credenciais inválidas", response.getBody());
    }

    @Test
    void shouldReturnInternalServerError_WhenUnexpectedExceptionOccurs() {
        AuthenticationDTO data = new AuthenticationDTO("usuario@email.com", "senha123");
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(RuntimeException.class);

        var response = authenticationController.login(data);

        assertEquals(500, response.getStatusCodeValue());
        assertEquals("Erro interno ao processar login", response.getBody());
    }
}*/