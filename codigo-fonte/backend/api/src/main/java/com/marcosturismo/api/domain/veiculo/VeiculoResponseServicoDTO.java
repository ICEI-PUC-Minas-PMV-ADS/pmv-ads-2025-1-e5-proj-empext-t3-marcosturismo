package com.marcosturismo.api.domain.veiculo;

import java.util.UUID;

public record VeiculoResponseServicoDTO(
        UUID id,
        String numeracao,
        String modelo,
        String marca,
        String anoModelo,
        Integer kmAtual,
        SituacaoVeiculo situacao,
        Integer kmProxTrocaOleo,
        Integer kmProxTrocaPneu
) {
}
