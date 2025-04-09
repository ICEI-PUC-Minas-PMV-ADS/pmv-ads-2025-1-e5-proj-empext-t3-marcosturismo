package com.marcosturismo.api.domain.servico;

import java.time.LocalDateTime;
import java.util.UUID;

public record ServicoRealizadoResponseDTO(
        UUID id,
        TipoServico tipoServico,
        Double custo,
        LocalDateTime dataCriacao
) {
}
