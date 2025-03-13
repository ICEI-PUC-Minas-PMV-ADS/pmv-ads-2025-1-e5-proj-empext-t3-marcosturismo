package com.marcosturismo.api.services;

import com.marcosturismo.api.domain.veiculo.Veiculo;
import com.marcosturismo.api.domain.veiculo.VeiculoDTO;
import com.marcosturismo.api.repositories.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class VeiculoService {
    @Autowired
    VeiculoRepository veiculoRepository;

    public List<Veiculo> getAllVeiculos() {
        return veiculoRepository.findAll();
    }

    public Veiculo createVeiculo(VeiculoDTO data) {
        Veiculo veiculo = new Veiculo(data);
        return veiculoRepository.save(veiculo);
    }

    public void deleteVeiculo(UUID id) {
        if (!veiculoRepository.existsById(id)) {
            throw new RuntimeException("Veículo não encontrado");
        }
        veiculoRepository.deleteById(id);
    }

    public Veiculo updateVeiculo(VeiculoDTO data, UUID id){
        Veiculo veiculo = veiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));
        veiculo.setNumeracao(data.numeracao());
        veiculo.setModelo(data.modelo());
        veiculo.setMarca(data.marca());
        veiculo.setAnoModelo(data.anoModelo());
        veiculo.setKmAtual(data.kmAtual());
        veiculo.setSituacao(data.situacao());
        veiculo.setPlaca(data.placa());
        veiculo.setKmProxTrocaOleo(data.kmProxTrocaOleo());
        veiculo.setKmProxTrocaPneu(data.kmProxTrocaPneu());
        veiculo.setLotacao(data.lotacao());
        veiculo.setCategoria(data.categoria());
        veiculo.setArCondicionado(data.arCondicionado());
        veiculo.setWifi(data.wifi());
        veiculo.setPoltronaReclinavel(data.poltronaReclinavel());
        veiculo.setTv(data.tv());
        veiculo.setGeladeira(data.geladeira());
        veiculo.setSanitarios(data.sanitarios());
        return veiculoRepository.save(veiculo);
    }

    public Optional<Veiculo> findNumeracao(String numeracao){
        return veiculoRepository.findByNumeracao(numeracao);
    }

    public Optional<Veiculo> findPlaca(String placa){
        return veiculoRepository.findByPlaca(placa);
    }

    public Optional<Veiculo> findById(UUID id){
        return veiculoRepository.findById(id);
    }
}
