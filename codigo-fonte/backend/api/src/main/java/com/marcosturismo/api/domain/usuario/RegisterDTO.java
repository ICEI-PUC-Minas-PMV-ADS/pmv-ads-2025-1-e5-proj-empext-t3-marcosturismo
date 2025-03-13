package com.marcosturismo.api.domain.usuario;

public record RegisterDTO(String email,
                          TipoUsuario tipo,
                          StatusUsuario status,
                          String nome,
                          String telefone,
                          String descricao) {
}
