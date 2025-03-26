package com.marcosturismo.api.domain.viagem;
import java.util.UUID;

public record ViagemDTO(
        StatusViagem status,
        Double distancia,
        Double valor,
        Long dataInicio,
        Long dataChegada,
        String enderecoSaida,
        String enderecoDestino,
        TipoViagem tipoViagem,
        UUID veiculo,
        UUID motorista,
        UUID cliente
) {
}
