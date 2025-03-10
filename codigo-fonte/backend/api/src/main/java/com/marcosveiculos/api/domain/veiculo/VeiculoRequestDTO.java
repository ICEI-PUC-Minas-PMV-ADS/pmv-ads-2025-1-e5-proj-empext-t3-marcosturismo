package com.marcosveiculos.api.domain.veiculo;

public record VeiculoRequestDTO(String modelo, String marca, Integer kmAtual, String anoModelo, Boolean arCondicionado,
                                Boolean wifi, Boolean poltronaReclinavel, Boolean tv) {
}
