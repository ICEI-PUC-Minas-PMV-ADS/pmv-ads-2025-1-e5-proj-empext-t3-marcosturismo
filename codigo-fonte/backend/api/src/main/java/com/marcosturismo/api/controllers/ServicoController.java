package com.marcosturismo.api.controllers;

import com.marcosturismo.api.domain.avaliacao.Avaliacao;
import com.marcosturismo.api.domain.servico.*;
import com.marcosturismo.api.domain.usuario.Usuario;
import com.marcosturismo.api.repositories.TipoServicoRepository;
import com.marcosturismo.api.services.ServicoService;
import com.marcosturismo.api.services.TipoServicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("servico")
public class ServicoController {

    @Autowired
    TipoServicoRepository tipoServicoRepository;

    @Autowired
    TipoServicoService tipoServicoService;

    @Autowired
    ServicoService servicoService;

    @PostMapping("/tipo_servico")
    public ResponseEntity<?> createTipoServico(@RequestBody @Validated TipoServicoDTO data) {
        try {

            if (this.tipoServicoRepository.findByDescricaoIgnoreCase(data.descricao()).isPresent()) {
                return ResponseEntity.badRequest().body("Esse tipo de serviço já está cadastrado.");
            }

            this.tipoServicoService.createTipoServico(data);

            return ResponseEntity.ok().body("Tipo de serviço registrado com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao registrar tipo de serviço: " + e.getMessage());
        }
    }

    @DeleteMapping("/tipo_servico/{tipoId}")
    public ResponseEntity<?> deleteTipoServico(@PathVariable UUID tipoId) {
        try {
            this.tipoServicoService.deleteTipoServico(tipoId);
            return ResponseEntity.ok().body("Tipo de serviço excluído com sucesso");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(400).body("Não é possível excluir este tipo de serviço, pois ele está sendo utilizado em outros registros.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/tipo_servico")
    public ResponseEntity<?> getAllTipoServico() {
        try {
            List<TipoServico> response = this.tipoServicoRepository.findAll();
            if (response.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar tipo de serviço: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createServico(@RequestBody @Validated ServicoDTO data) {
        try {
            var authentication = SecurityContextHolder.getContext().getAuthentication();
            var principal = authentication.getPrincipal();

            UUID userId = null;
            if (principal instanceof UserDetails) {
                userId = ((Usuario) principal).getId();
            }
            if (userId == null) {
                return ResponseEntity.badRequest().body("Usuário não encontrado");
            }

            var servico = this.servicoService.createServicoWithTipoServico(data, userId);

            return ResponseEntity.ok().body("Serviço registrado com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao registrar serviço: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllServico() {
        try {
            List<ServicoResponseDTO> response = this.servicoService.getAllServicos();
            if (response.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar todos os serviços: " + e.getMessage());
        }
    }

    @DeleteMapping("/{servicoId}")
    public ResponseEntity<?> deleteServico(@PathVariable UUID servicoId) {
        try {
            this.servicoService.deleteServico(servicoId);
            return ResponseEntity.ok().body("Serviço excluído com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
