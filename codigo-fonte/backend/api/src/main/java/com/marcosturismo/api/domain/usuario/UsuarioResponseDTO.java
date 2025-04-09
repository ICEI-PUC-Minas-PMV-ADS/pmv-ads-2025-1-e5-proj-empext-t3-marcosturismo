package com.marcosturismo.api.domain.usuario;

import java.time.LocalDateTime;
import java.util.UUID;

public record UsuarioResponseDTO(
        UUID id,
        StatusUsuario status,
        String nome,
        TipoUsuario tipo,
        LocalDateTime dataCriacao
) {
}
