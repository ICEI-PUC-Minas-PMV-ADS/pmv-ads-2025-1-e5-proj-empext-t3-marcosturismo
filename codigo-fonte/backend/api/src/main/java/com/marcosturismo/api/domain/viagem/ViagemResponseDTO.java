package com.marcosturismo.api.domain.viagem;

import com.marcosturismo.api.domain.cheklist_veiculo.ChecklistResponseViagemDTO;
import com.marcosturismo.api.domain.cliente.Cliente;
import com.marcosturismo.api.domain.usuario.StatusUsuario;
import com.marcosturismo.api.domain.usuario.Usuario;
import com.marcosturismo.api.domain.veiculo.Veiculo;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

public record ViagemResponseDTO(
        UUID id,
        StatusViagem status,
        Double distancia,
        Double valor,
        Date dataInicio,
        Date dataChegada,
        String enderecoSaida,
        String enderecoDestino,
        LocalDateTime dataCriacao,
        TipoViagem tipoViagem,
        UUID veiculoId,
        String veiculoNumeracao,
        String veiculoModelo,
        String veiculoMarca,
        UUID motoristaId,
        StatusUsuario motoristaStatus,
        String motoristaNome,
        UUID clienteId,
        String clienteNome,
        ChecklistResponseViagemDTO checkList
) {
}
