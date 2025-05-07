package com.marcosturismo.api.domain.servico;

import java.util.UUID;

public record ServicoRealizadoDTO(
        UUID tipoServicoId,
        Double custo
) {
}
