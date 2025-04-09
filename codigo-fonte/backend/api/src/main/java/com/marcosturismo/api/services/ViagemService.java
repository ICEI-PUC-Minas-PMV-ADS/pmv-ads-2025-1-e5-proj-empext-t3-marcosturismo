package com.marcosturismo.api.services;

import com.marcosturismo.api.domain.cheklist_veiculo.ChecklistVeiculo;
import com.marcosturismo.api.domain.cliente.Cliente;
import com.marcosturismo.api.domain.cliente.ClienteDTO;
import com.marcosturismo.api.domain.usuario.StatusUsuario;
import com.marcosturismo.api.domain.usuario.Usuario;
import com.marcosturismo.api.domain.veiculo.Veiculo;
import com.marcosturismo.api.domain.viagem.StatusViagem;
import com.marcosturismo.api.domain.viagem.Viagem;
import com.marcosturismo.api.domain.viagem.ViagemDTO;
import com.marcosturismo.api.domain.viagem.ViagemResponseDTO;
import com.marcosturismo.api.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.crypto.Data;
import java.util.*;

@Service
public class ViagemService {

    @Autowired
    ViagemRepository viagemRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    VeiculoRepository veiculoRepository;

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    ChecklistRepository checklistRepository;

    public List<ViagemResponseDTO> getAllViagens(Boolean isStaff, UUID id) {
        // Obtem as viagens conforme o parâmetro `isStaff`
        var viagens = isStaff ? this.viagemRepository.findByMotoristaId(id) : this.viagemRepository.findAll();

        // Retorna uma lista vazia caso `viagens` seja nula
        if (viagens == null || viagens.isEmpty()) {
            return List.of();  // Correção: Retornando uma lista vazia corretamente
        }

        // Mapeia as viagens para ViagemResponseDTO e retorna a lista resultante
        return viagens.stream()
                .map(viagem -> {
                    // Busca o checklist relacionado a viagem
                    var checklistOptional = checklistRepository.findByViagemId(
                            viagem.getId()
                    );

                    // Monta o DTO com ou sem checklist
                    return viagem.toResponseDTO(checklistOptional.orElse(null));
                })
                .toList();
    }

    public void startViagem(UUID viagemId) {
        var viagem = this.viagemRepository.findById(viagemId);

        if (viagem.isEmpty()) {
            throw new RuntimeException("Viagem não encontrada");
        }

        var newViagem = viagem.get();
        newViagem.setStatus(StatusViagem.EmAndamento);
        this.viagemRepository.save(newViagem);

        var motorista = viagem.get().getMotorista();

        motorista.setStatus(StatusUsuario.EmServico);
        this.usuarioRepository.save(motorista);
    }

    public void finishViagem(UUID viagemId, Integer km) {
        var viagem = this.viagemRepository.findById(viagemId);

        if (viagem.isEmpty()) {
            throw new RuntimeException("Viagem não encontrada");
        }

        var newViagem = viagem.get();
        newViagem.setStatus(StatusViagem.Finalizada);
        this.viagemRepository.save(newViagem);

        var motorista = viagem.get().getMotorista();

        motorista.setStatus(StatusUsuario.Ativo);

        this.usuarioRepository.save(motorista);

        var veiculo = viagem.get().getVeiculo();
        veiculo.setKmAtual(km);

        veiculoRepository.save(veiculo);
    }

    public void cancelViagem(UUID viagemId) {
        var viagem = this.viagemRepository.findById(viagemId);
        if (viagem.isEmpty()) {
            throw new RuntimeException("Viagem não encontrada");
        }

        var newViagem = viagem.get();
        boolean viagemEmAndamento = newViagem.getStatus() == StatusViagem.EmAndamento;
        newViagem.setStatus(StatusViagem.Cancelada);
        this.viagemRepository.save(newViagem);
        if (viagemEmAndamento) {
            var motorista = viagem.get().getMotorista();
            motorista.setStatus(StatusUsuario.Ativo);
            this.usuarioRepository.save(motorista);
        }
    }


    public void updateViagem(ViagemDTO data, UUID ViagemId) {
        Viagem viagem = viagemRepository.findById(ViagemId)
                .orElseThrow(() -> new RuntimeException("Viagem não encontrada"));

        Usuario motorista = usuarioRepository.findById(data.motorista())
                .orElseThrow(() -> new RuntimeException("Motorista não encontrado"));

        Cliente cliente = clienteRepository.findById(data.cliente())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        Veiculo veiculo = veiculoRepository.findById(data.veiculo())
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));

        viagem.setStatus(data.status());
        viagem.setDistancia(data.distancia());
        viagem.setValor(data.valor());
        viagem.setDataInicio(new Date(data.dataInicio()));
        viagem.setDataChegada(new Date(data.dataChegada()));
        viagem.setEnderecoSaida(data.enderecoSaida());
        viagem.setEnderecoDestino(data.enderecoDestino());
        viagem.setTipoViagem(data.tipoViagem());
        viagem.setVeiculo(veiculo);
        viagem.setMotorista(motorista);
        viagem.setCliente(cliente);

        this.viagemRepository.save(viagem);

        if (viagem.getStatus() == StatusViagem.EmAndamento) {
            motorista.setStatus(StatusUsuario.EmServico);
            this.usuarioRepository.save(motorista);
        }
    }

}
