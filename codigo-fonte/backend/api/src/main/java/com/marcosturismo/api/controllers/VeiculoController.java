package com.marcosturismo.api.controllers;

import com.marcosturismo.api.domain.veiculo.Veiculo;
import com.marcosturismo.api.domain.veiculo.VeiculoDTO;
import com.marcosturismo.api.services.VeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("veiculo")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    @GetMapping
    public ResponseEntity<?> getAllVeiculos() {
        try {
            List<Veiculo> response = this.veiculoService.getAllVeiculos();
            if (response.isEmpty()) {
                return ResponseEntity.noContent().build(); // Retorna 204 se não houver veículos
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar veículos: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createVeiculo(@RequestBody @Validated VeiculoDTO data) {
        try {
            if (this.veiculoService.findNumeracao(data.numeracao()).isPresent()) {
                return ResponseEntity.badRequest().body("Existe um veículo cadastrado com essa numeração.");
            }

            if (this.veiculoService.findPlaca(data.placa()).isPresent()) {
                return ResponseEntity.badRequest().body("Existe um veículo cadastrado com essa placa.");
            }

            var response = this.veiculoService.createVeiculo(data);
            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao criar veículo: " + e.getMessage());
        }
    }

    @PutMapping("/{veiculoId}")
    public ResponseEntity<?> updateVeiculo(@PathVariable UUID veiculoId, @RequestBody @Validated VeiculoDTO data) {
        try {
            var currentVeiculo = this.veiculoService.findById(veiculoId);
            if (currentVeiculo.isEmpty()) {
                return ResponseEntity.badRequest().body("Veículo não encontrado");
            }
            var numVeiculo = this.veiculoService.findNumeracao(data.numeracao());
            if (numVeiculo.isPresent()) {
                if (numVeiculo.get().getId() != currentVeiculo.get().getId()) {
                    return ResponseEntity.badRequest().body("Existe um veículo cadastrado com essa numeração.");
                }
            }

            var placVeiculo = this.veiculoService.findPlaca(data.placa());
            if (placVeiculo.isPresent()) {
                if (placVeiculo.get().getId() != currentVeiculo.get().getId()) {
                    return ResponseEntity.badRequest().body("Existe um veículo cadastrado com essa placa.");
                }
            }

            var updatedVeiculo = veiculoService.updateVeiculo(data, veiculoId);
            return ResponseEntity.ok(updatedVeiculo);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao editar veículo: " + e.getMessage());
        }
    }

    @DeleteMapping("/{veiculoId}")
    public ResponseEntity<?> deleteVeiculo(@PathVariable UUID veiculoId) {
        try {
            veiculoService.deleteVeiculo(veiculoId);
            return ResponseEntity.ok().body("Veículo excluído com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

}

