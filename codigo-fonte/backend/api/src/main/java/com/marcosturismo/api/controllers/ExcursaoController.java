package com.marcosturismo.api.controllers;

import com.marcosturismo.api.domain.excursao.Excursao;
import com.marcosturismo.api.domain.excursao.ExcursaoDTO;
import com.marcosturismo.api.domain.usuario.Usuario;
import com.marcosturismo.api.repositories.ExcursaoRepository;
import com.marcosturismo.api.services.ExcursaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("excursao")
public class ExcursaoController {

    @Autowired
    ExcursaoService excursaoService;

    @Autowired
    ExcursaoRepository excursaoRepository;

    @PostMapping
    public ResponseEntity<?> createExcursao(@RequestBody @Validated ExcursaoDTO data) {
        try {
            Excursao newExcursao = new Excursao(data);
            this.excursaoRepository.save(newExcursao);

            return ResponseEntity.ok().body("Excursão registrada com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao registrar excursão: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllExcursao() {
        try {
            List<Excursao> excursoes = this.excursaoRepository.findAll();
            if (excursoes.isEmpty()) {
                return ResponseEntity.noContent().build(); // Retorna 204 se não houver excursões
            }
            return ResponseEntity.ok(excursoes);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar excursões: " + e.getMessage());
        }
    }

    @PutMapping("/{excursaoId}")
    public ResponseEntity<?> updateExcursao(@PathVariable UUID excursaoId, @RequestBody @Validated ExcursaoDTO data) {
        try {

            Optional<Excursao> currentExcursao = this.excursaoRepository.findById(excursaoId);

            if (currentExcursao.isEmpty()) {
                return ResponseEntity.badRequest().body("Excursão não encontrada");
            }

            this.excursaoService.updateExcursao(excursaoId, data);

            return ResponseEntity.ok().body("Excursão alterada com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao registrar excursão: " + e.getMessage());
        }
    }

    @DeleteMapping("/{excursaoId}")
    public ResponseEntity<?> deleteExcursao(@PathVariable UUID excursaoId) {
        try {
            this.excursaoService.deleteExcursao(excursaoId);
            return ResponseEntity.ok().body("Excursão excluído com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }

    }

    @GetMapping("/upcoming")
    public ResponseEntity<?> getAllExcursaoUpcoming(@RequestParam Long date) {
        try {
            List<Excursao> excursoes = this.excursaoRepository.findByDataExcursaoAfter(new Date(date));
            if (excursoes.isEmpty()) {
                return ResponseEntity.noContent().build(); // Retorna 204 se não houver excursões
            }
            return ResponseEntity.ok(excursoes);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar excursões: " + e.getMessage());
        }
    }
}
