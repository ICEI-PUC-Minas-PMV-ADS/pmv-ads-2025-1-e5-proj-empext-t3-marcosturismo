package com.marcosturismo.api.domain.excursao;

import java.util.Date;

public record ExcursaoDTO(
        String titulo,
        String descricao,
        Long dataExcursao
) {
}
