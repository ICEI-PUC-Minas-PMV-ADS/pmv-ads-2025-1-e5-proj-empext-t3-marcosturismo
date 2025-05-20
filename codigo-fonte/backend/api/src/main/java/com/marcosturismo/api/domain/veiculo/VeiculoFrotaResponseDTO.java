package com.marcosturismo.api.domain.veiculo;

import java.util.List;
import java.util.UUID;

public record VeiculoFrotaResponseDTO(
        String modelo,
        String anoModelo,
        String marca,
        Integer lotacao,
        String categoria,
        Boolean arCondicionado,
        Boolean wifi,
        Boolean poltronaReclinavel,
        Boolean tv,
        Boolean geladeira,
        Boolean sanitarios,
        List<String> imagens
) {
}
