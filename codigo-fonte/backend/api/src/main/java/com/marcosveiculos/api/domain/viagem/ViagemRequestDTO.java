package com.marcosveiculos.api.domain.viagem;

public record ViagemRequestDTO(
        String enderecoSaida,
        String enderecoChegada,
        Double distancia
) {
}
