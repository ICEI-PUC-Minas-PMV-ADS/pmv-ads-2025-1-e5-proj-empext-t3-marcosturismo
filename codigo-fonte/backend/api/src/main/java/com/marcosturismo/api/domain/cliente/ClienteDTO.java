package com.marcosturismo.api.domain.cliente;

public record ClienteDTO(
        String nome,
        String cpfCnpj,
        String telefone,
        String endereco
) {
}
