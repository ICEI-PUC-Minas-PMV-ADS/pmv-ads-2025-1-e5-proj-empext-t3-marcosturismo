package com.marcosturismo.api.domain.cheklist_veiculo;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record ChecklistResponseViagemDTO(
        UUID id,
        LocalDate dataChecklist,
        Boolean pneusOk,
        Boolean limpezaOk,
        Boolean avariasOk,
        Boolean faroisOk,
        Boolean documentoOk,
        String ocorrencias,
        LocalDateTime dataCriacao
) {

}
