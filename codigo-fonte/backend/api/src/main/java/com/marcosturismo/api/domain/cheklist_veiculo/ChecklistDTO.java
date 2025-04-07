package com.marcosturismo.api.domain.cheklist_veiculo;

import java.util.UUID;

public record ChecklistDTO(
        String dataChecklist,
        Boolean pneusOk,
        Boolean limpezaOk,
        Boolean avariasOk,
        Boolean faroisOk,
        Boolean documentoOk,
        String ocorrencias
) {
}
