package com.marcosturismo.api.domain.veiculo;

public record VeiculoDTO(
        String numeracao,
        String modelo,
        String marca,
        String anoModelo,
        Integer kmAtual,
        SituacaoVeiculo situacao,
        String placa,
        Integer kmProxTrocaOleo,
        Integer kmProxTrocaPneu,
        Integer lotacao,
        String categoria,
        Boolean arCondicionado,
        Boolean wifi,
        Boolean poltronaReclinavel,
        Boolean tv,
        Boolean geladeira,
        Boolean sanitarios
) {
}
