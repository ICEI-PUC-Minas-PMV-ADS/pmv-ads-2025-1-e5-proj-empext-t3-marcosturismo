package com.marcosveiculos.api.service.veiculos;

import com.marcosveiculos.api.domain.veiculo.Veiculo;
import com.marcosveiculos.api.domain.veiculo.VeiculoRequestDTO;
import com.marcosveiculos.api.domain.veiculo.VeiculoResponseDTO;
import com.marcosveiculos.api.repositories.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VeiculoService {
    @Autowired
    private VeiculoRepository repository;

    public Veiculo createVeiculo(VeiculoRequestDTO data) {
        Veiculo newVeiculo = new Veiculo();
        newVeiculo.setModelo(data.modelo());
        newVeiculo.setMarca(data.marca());
        newVeiculo.setKmAtual(data.kmAtual());
        newVeiculo.setAnoModelo(data.anoModelo());
        newVeiculo.setWifi(data.wifi());
        newVeiculo.setPoltronaReclinavel(data.poltronaReclinavel());
        newVeiculo.setArCondicionado(data.arCondicionado());
        newVeiculo.setTv(data.tv());

        repository.save(newVeiculo);
        return newVeiculo;
    }

    public List<VeiculoResponseDTO> getAllVeiculos() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Veiculo> veiculos = this.repository.findAll(
                pageable
        );
        return veiculos.map(veiculo -> new VeiculoResponseDTO(veiculo.getId(), veiculo.getModelo(), veiculo.getMarca(), veiculo.getKmAtual(), veiculo.getAnoModelo(), veiculo.getArCondicionado(), veiculo.getWifi(), veiculo.getPoltronaReclinavel(), veiculo.getTv())).stream().toList();
    }
}
