package com.marcosturismo.api.controllers;

import com.marcosturismo.api.domain.avaliacao.Avaliacao;
import com.marcosturismo.api.domain.avaliacao.AvaliacaoDTO;
import com.marcosturismo.api.services.AvaliacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("avaliacao")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @GetMapping
    public ResponseEntity<?> getAllAvaliacoes() {
        try {
            // Busca todas avaliações validas e a invalidar
            List<Avaliacao> response = this.avaliacaoService.getAllAvaliacoes();
            if (response.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar avaliações: " + e.getMessage());
        }
    }

    @GetMapping("/validas")
    public ResponseEntity<?> getAllAvaliacoesValidas() {
        try {
            // Busca todas avaliações validas
            Optional<List<Avaliacao>> response = this.avaliacaoService.getAllAvaliacoesValidas();
            if (response.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(response.get());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar avaliações: " + e.getMessage());
        }
    }

    @PutMapping("/validar/{avaliacaoId}")
    public  ResponseEntity<?> validAvaliacao(@PathVariable UUID avaliacaoId){
        try {
            var response = this.avaliacaoService.validAvaliacao(avaliacaoId);
            return ResponseEntity.status(200).body("Avaliação validada com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao validar avaliação: " + e.getMessage());
        }
    }

    @DeleteMapping("/{avaliacaoId}")
    public  ResponseEntity<?> deleteAvaliacao(@PathVariable UUID avaliacaoId){
        try {
            avaliacaoService.deleteAvaliacao(avaliacaoId);
            return ResponseEntity.ok().body("Avaliação excluída com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping()
    public  ResponseEntity<?> createAvaliacao(@RequestBody @Validated AvaliacaoDTO data){
        try {
            var response = this.avaliacaoService.createAvaliacao(data);
            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao criar avaliação: " + e.getMessage());
        }
    }
}
