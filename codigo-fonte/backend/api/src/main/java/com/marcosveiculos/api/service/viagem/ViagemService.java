package com.marcosveiculos.api.service.viagem;

import com.fasterxml.jackson.datatype.jsr310.deser.OneBasedMonthDeserializer;
import com.marcosveiculos.api.domain.veiculo.Veiculo;
import com.marcosveiculos.api.domain.veiculo.VeiculoRequestDTO;
import com.marcosveiculos.api.domain.viagem.Viagem;
import com.marcosveiculos.api.domain.viagem.ViagemRequestDTO;
import com.marcosveiculos.api.repositories.VeiculoRepository;
import com.marcosveiculos.api.repositories.ViagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ViagemService {
    @Autowired
    private VeiculoRepository veiculoRepository;

    @Autowired
    private ViagemRepository viagemRepository;

    public Viagem createViagem(UUID veiculoId, ViagemRequestDTO data) {
        Veiculo veiculo = veiculoRepository.findById(veiculoId).orElseThrow(() -> new IllegalArgumentException("Veiculo not found"));

        Viagem newViagem = new Viagem();
        newViagem.setDistancia(data.distancia());
        newViagem.setVeiculo(veiculo);
        newViagem.setEnderecoChegada(data.enderecoChegada());
        newViagem.setEnderecoSaida(data.enderecoSaida());

        viagemRepository.save(newViagem);
        return newViagem;
    }
}
