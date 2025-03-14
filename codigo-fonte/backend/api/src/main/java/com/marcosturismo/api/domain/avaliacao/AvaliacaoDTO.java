package com.marcosturismo.api.domain.avaliacao;

import java.util.Date;

public record AvaliacaoDTO(String autor,
                           String titulo,
                           String descricao,
                           Double nota,
                           Long dataPublicacao) {
}
