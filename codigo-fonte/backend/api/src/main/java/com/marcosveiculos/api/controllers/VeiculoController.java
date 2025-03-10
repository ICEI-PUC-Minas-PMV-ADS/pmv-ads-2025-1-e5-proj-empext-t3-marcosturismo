package com.marcosveiculos.api.controllers;

import com.marcosveiculos.api.domain.veiculo.Veiculo;
import com.marcosveiculos.api.domain.veiculo.VeiculoRequestDTO;
import com.marcosveiculos.api.domain.veiculo.VeiculoResponseDTO;
import com.marcosveiculos.api.service.veiculos.VeiculoService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/veiculos")
public class VeiculoController {
    @Autowired
    private VeiculoService veiculoService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Veiculo> create(@RequestParam("modelo") String modelo, @RequestParam("marca") String marca, @RequestParam("kmAtual") Integer kmAtual, @RequestParam("anoModelo") String anoModelo, @RequestParam("arCondicionado") Boolean arCondicionado,
                                          @RequestParam("wifi") Boolean wifi, @RequestParam("poltronaReclinavel") Boolean poltronaReclinavel, @RequestParam("tv") Boolean tv) {

        VeiculoRequestDTO veiculoRequestDTO = new VeiculoRequestDTO(modelo, marca, kmAtual, anoModelo, arCondicionado, wifi, poltronaReclinavel, tv);
        Veiculo newVeiculo = this.veiculoService.createVeiculo(veiculoRequestDTO);
        return ResponseEntity.ok(newVeiculo);
    }

    @GetMapping
    public ResponseEntity<List<VeiculoResponseDTO>> getVeiculos(){
        List<VeiculoResponseDTO> allVeiculos = this.veiculoService.getAllVeiculos();
        return ResponseEntity.ok(allVeiculos);
    }
}