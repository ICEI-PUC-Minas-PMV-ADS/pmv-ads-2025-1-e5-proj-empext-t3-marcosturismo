package com.marcosturismo.api.services;

import com.marcosturismo.api.domain.servico.*;
import com.marcosturismo.api.domain.usuario.Usuario;
import com.marcosturismo.api.domain.veiculo.Veiculo;
import com.marcosturismo.api.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
public class ServicoService {

    @Autowired
    VeiculoRepository veiculoRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    ServicoRepository servicoRepository;

    @Autowired
    TipoServicoRepository tipoServicoRepository;

    @Autowired
    ServicoRealizadoRepository servicoRealizadoRepository;

    public Servico createServicoWithTipoServico(ServicoDTO dto, UUID responsavelId) {
        Veiculo veiculo = veiculoRepository.findById(dto.veiculoId())
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));
        Usuario responsavel = usuarioRepository.findById(responsavelId)
                .orElseThrow(() -> new RuntimeException("Responsável não encontrado"));

        Servico servico = Servico.builder()
                .dataServico(LocalDate.parse(dto.dataServico()))
                .kmVeiculo(dto.kmVeiculo())
                .descricao(dto.descricao())
                .veiculo(veiculo)
                .responsavel(responsavel)
                .build();

        servico = servicoRepository.save(servico);

        for (ServicoRealizadoDTO srDTO : dto.servicosRealizados()) {
            TipoServico tipoServico = tipoServicoRepository.findById(srDTO.tipoServicoId())
                    .orElseThrow(() -> new RuntimeException("Tipo de serviço não encontrado: " + srDTO.tipoServicoId()));

            ServicoRealizado servicoRealizado = ServicoRealizado.builder()
                    .servico(servico)
                    .tipoServico(tipoServico)
                    .custo(srDTO.custo())
                    .build();

            servicoRealizadoRepository.save(servicoRealizado);
        }

        return servico;
    }
}
