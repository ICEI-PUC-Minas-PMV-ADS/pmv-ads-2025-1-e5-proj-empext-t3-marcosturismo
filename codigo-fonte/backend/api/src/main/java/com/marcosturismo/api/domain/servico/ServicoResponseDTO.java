package com.marcosturismo.api.domain.servico;

import com.marcosturismo.api.domain.usuario.Usuario;
import com.marcosturismo.api.domain.usuario.UsuarioResponseDTO;
import com.marcosturismo.api.domain.veiculo.Veiculo;
import com.marcosturismo.api.domain.veiculo.VeiculoResponseServicoDTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record ServicoResponseDTO(
        UUID id,
        LocalDate dataServico,
        Integer kmVeiculo,
        String descricao,
        LocalDateTime dataCriacao,
        VeiculoResponseServicoDTO veiculo,
        UsuarioResponseDTO responsavel,
        Double custoTotal,
        List<ServicoRealizadoResponseDTO> servicosRealizados
) {
}
