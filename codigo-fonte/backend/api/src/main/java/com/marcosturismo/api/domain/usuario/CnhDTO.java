package com.marcosturismo.api.domain.usuario;

import java.util.Date;

public record CnhDTO(
        String nome,
        String dataNascimento,
        String uf,
        String municipio,
        String dataEmissao,
        String dataValidade,
        String rg,
        String org,
        String ufEmissor,
        String cpf,
        String numRegistro,
        String catHabilitacao,
        String dataPHabilitacao
) {
}
