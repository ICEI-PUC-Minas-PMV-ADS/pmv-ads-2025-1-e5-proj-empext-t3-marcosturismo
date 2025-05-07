package com.marcosturismo.api.services;

import com.marcosturismo.api.domain.servico.*;
import com.marcosturismo.api.domain.usuario.Usuario;
import com.marcosturismo.api.domain.veiculo.Veiculo;
import com.marcosturismo.api.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

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

        veiculo.setKmAtual(dto.kmVeiculo());
        if (dto.kmProxTrocaOleo() != null) {
            veiculo.setKmProxTrocaOleo(dto.kmProxTrocaOleo());
        }
        if (dto.kmProxTrocaPneu() != null) {
            veiculo.setKmProxTrocaPneu(dto.kmProxTrocaPneu());
        }

        veiculoRepository.save(veiculo);

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

    public List<ServicoResponseDTO> getAllServicos() {
        List<ServicoResponseDTO> servicosResponse = new java.util.ArrayList<>(List.of());
        List<Servico> servicos = this.servicoRepository.findAll();

        for (Servico servico : servicos) {

            List<ServicoRealizadoResponseDTO> servicoRealizadoResponseDTOS = new java.util.ArrayList<>(List.of());

            double custoTotal = 0.0;

            List<ServicoRealizado> servicosRealizados = this.servicoRealizadoRepository.findByServicoId(servico.getId());

            for (ServicoRealizado servicoRealizado : servicosRealizados) {
                custoTotal = custoTotal + servicoRealizado.getCusto();
                servicoRealizadoResponseDTOS.add(new ServicoRealizadoResponseDTO(
                        servicoRealizado.getId(),
                        servicoRealizado.getTipoServico(),
                        servicoRealizado.getCusto(),
                        servicoRealizado.getDataCriacao()
                ));
            }

            ServicoResponseDTO servicoResponse = new ServicoResponseDTO(
                    servico.getId(),
                    servico.getDataServico(),
                    servico.getKmVeiculo(),
                    servico.getDescricao(),
                    servico.getDataCriacao(),
                    servico.getVeiculo().toResponseServicoDTO(),
                    servico.getResponsavel().toResponseDTO(),
                    custoTotal,
                    servicoRealizadoResponseDTOS
            );

            servicosResponse.add(servicoResponse);
        }

        return servicosResponse;
    }

    public void deleteServico(UUID id) {
        if (!this.servicoRepository.existsById(id)) {
            throw new RuntimeException("Serviço não encontrado");
        }
        this.servicoRepository.deleteById(id);
    }
}
