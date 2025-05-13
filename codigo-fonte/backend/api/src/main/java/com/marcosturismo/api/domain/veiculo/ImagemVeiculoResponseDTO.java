package com.marcosturismo.api.domain.veiculo;

import java.util.UUID;

public record ImagemVeiculoResponseDTO(
        UUID id,
        String imgUrl,
        UUID veiculoId
) {
}
