package com.marcosveiculos.api.domain.veiculo;

import java.util.UUID;

public record VeiculoResponseDTO(UUID id, String modelo, String marca, Integer kmAtual, String anoModelo,
                                 Boolean arCondicionado,
                                 Boolean wifi, Boolean poltronaReclinavel, Boolean tv) {
}
