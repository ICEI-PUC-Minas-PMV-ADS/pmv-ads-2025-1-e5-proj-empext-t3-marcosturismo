package com.marcosturismo.api.domain.servico;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public record ServicoDTO(
        String dataServico,
        Integer kmVeiculo,
        String descricao,
        UUID veiculoId,
        Integer kmProxTrocaOleo,
        Integer kmProxTrocaPneu,
        List<ServicoRealizadoDTO> servicosRealizados
) {
}