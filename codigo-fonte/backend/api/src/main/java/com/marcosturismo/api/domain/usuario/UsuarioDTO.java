package com.marcosturismo.api.domain.usuario;

public record UsuarioDTO(String email,
                         TipoUsuario tipo,
                         StatusUsuario status,
                         String nome,
                         String telefone
) {
}
