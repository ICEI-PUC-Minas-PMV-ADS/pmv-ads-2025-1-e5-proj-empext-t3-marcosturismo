package com.marcosturismo.api.controllers;

import com.marcosturismo.api.domain.cheklist_veiculo.ChecklistDTO;
import com.marcosturismo.api.domain.cliente.Cliente;
import com.marcosturismo.api.domain.usuario.TipoUsuario;
import com.marcosturismo.api.domain.usuario.Usuario;
import com.marcosturismo.api.domain.veiculo.Veiculo;
import com.marcosturismo.api.domain.viagem.StatusViagem;
import com.marcosturismo.api.domain.viagem.Viagem;
import com.marcosturismo.api.domain.viagem.ViagemDTO;
import com.marcosturismo.api.repositories.*;
import com.marcosturismo.api.services.ChecklistService;
import com.marcosturismo.api.services.UsuarioService;
import org.springframework.security.core.context.SecurityContextHolder;
import com.marcosturismo.api.services.ViagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("viagem")
public class ViagemController {

    @Autowired
    ViagemService viagemService;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    VeiculoRepository veiculoRepository;

    @Autowired
    ViagemRepository viagemRepository;

    @Autowired
    ChecklistService checklistService;

    @Autowired
    ChecklistRepository checklistRepository;

    @GetMapping
    public ResponseEntity<?> getAllViagem() {
        try {
            var authentication = SecurityContextHolder.getContext().getAuthentication();
            var authorities = authentication.getAuthorities();
            var principal = authentication.getPrincipal();

            UUID userId = null;
            if (principal instanceof UserDetails) {
                userId = ((Usuario) principal).getId();
            }
            if (userId == null) {
                return ResponseEntity.badRequest().body("Usuário não encontrado");
            }
            // Verifica se o usuário tem a role STAFF
            boolean isStaff = authorities.stream()
                    .anyMatch(auth -> auth.getAuthority().equals("ROLE_STAFF"));

            var response = this.viagemService.getAllViagens(isStaff, userId);
            if (response.isEmpty()) {
                return ResponseEntity.noContent().build(); // Retorna 204 se não houver viagens
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar viagens: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createViagem(@RequestBody @Validated ViagemDTO data) {
        try {
            var motorista = this.usuarioRepository.findById(data.motorista());
            if (motorista.isEmpty()) {
                return ResponseEntity.badRequest().body("Motorista não encontrado");
            }

            var cliente = this.clienteRepository.findById(data.cliente());
            if (cliente.isEmpty()) {
                return ResponseEntity.badRequest().body("Cliente não encontrado");
            }

            var veiculo = veiculoRepository.findById(data.veiculo());
            if (veiculo.isEmpty()) {
                return ResponseEntity.badRequest().body("Veículo não encontrado");
            }

            this.viagemRepository.save(new Viagem(data, cliente.get(), motorista.get(), veiculo.get()));

            return ResponseEntity.ok().body("Viagem registrada com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao registrar viagem: " + e.getMessage());
        }
    }

    @PutMapping("/iniciar/{viagemId}")
    public ResponseEntity<?> startViagem(@PathVariable UUID viagemId) {
        try {
            var viagem = this.viagemRepository.findById(viagemId);

            if (viagem.isEmpty()) {
                return ResponseEntity.badRequest().body("Viagem não encontrada");
            }

            if (viagem.get().getStatus() != StatusViagem.NaoIniciada) {
                return ResponseEntity.badRequest().body("Não é possível iniciar essa viagem pois já foi concluída ou cancelada.");
            }

            var authentication = SecurityContextHolder.getContext().getAuthentication();
            var principal = authentication.getPrincipal();
            var authorities = authentication.getAuthorities();

            UUID userId = null;
            if (principal instanceof UserDetails) {
                userId = ((Usuario) principal).getId();
            }
            if (userId == null) {
                return ResponseEntity.badRequest().body("Usuário não encontrado");
            }

            // Verifica se o usuário tem a role STAFF
            boolean isStaff = authorities.stream()
                    .anyMatch(auth -> auth.getAuthority().equals("ROLE_STAFF"));

            if (isStaff && userId != viagem.get().getMotorista().getId()) {
                return ResponseEntity.badRequest().body("Você não tem permissão para iniciar esta viagem pois não é o motorista.");
            }

            this.viagemService.startViagem(viagemId);

            return ResponseEntity.ok().body("Viagem foi iniciada com sucesso. Tenha uma boa viagem!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao registrar viagem: " + e.getMessage());
        }
    }

    @PutMapping("/cancelar/{viagemId}")
    public ResponseEntity<?> cancelViagem(@PathVariable UUID viagemId) {
        try {
            var viagem = this.viagemRepository.findById(viagemId);

            if (viagem.isEmpty()) {
                return ResponseEntity.badRequest().body("Viagem não encontrada");
            }

            if (viagem.get().getStatus() == StatusViagem.Finalizada) {
                return ResponseEntity.badRequest().body("Não é possível cancelar a viagem porque ela já foi finalizada.");
            }

            this.viagemService.cancelViagem(viagemId);

            return ResponseEntity.ok().body("Viagem foi cancelada com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao registrar viagem: " + e.getMessage());
        }
    }

    @PutMapping("/finalizar/{viagemId}")
    public ResponseEntity<?> finishViagem(@PathVariable UUID viagemId, @RequestParam Integer km) {
        try {
            var viagem = this.viagemRepository.findById(viagemId);

            if (viagem.isEmpty()) {
                return ResponseEntity.badRequest().body("Viagem não encontrada");
            }

            if (viagem.get().getStatus() == StatusViagem.Cancelada || viagem.get().getStatus() == StatusViagem.Finalizada) {
                return ResponseEntity.badRequest().body("Não é possível finalizar essa viagem pois já foi concluída ou cancelada.");
            }

            var authentication = SecurityContextHolder.getContext().getAuthentication();
            var principal = authentication.getPrincipal();
            var authorities = authentication.getAuthorities();

            UUID userId = null;
            if (principal instanceof UserDetails) {
                userId = ((Usuario) principal).getId();
            }
            if (userId == null) {
                return ResponseEntity.badRequest().body("Usuário não encontrado");
            }

            // Verifica se o usuário tem a role STAFF
            boolean isStaff = authorities.stream()
                    .anyMatch(auth -> auth.getAuthority().equals("ROLE_STAFF"));

            if (isStaff && userId != viagem.get().getMotorista().getId()) {
                return ResponseEntity.badRequest().body("Você não tem permissão para finalizar esta viagem pois não é o motorista.");
            }

            this.viagemService.finishViagem(viagemId, km);

            return ResponseEntity.ok().body("Viagem foi finalizada com sucesso. Tenha um bom descanso!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao registrar viagem: " + e.getMessage());
        }
    }

    @PutMapping("/{viagemId}")
    public ResponseEntity<?> updateViagem(@PathVariable UUID viagemId, @RequestBody @Validated ViagemDTO data) {
        try {
            Viagem viagem = viagemRepository.findById(viagemId)
                    .orElseThrow(() -> new RuntimeException("Viagem não encontrada"));
            if (viagem.getStatus() == StatusViagem.Finalizada || viagem.getStatus() == StatusViagem.Cancelada) {
                return ResponseEntity.badRequest().body("Não é possível alterar uma viagem que foi finalizada ou cancelada.");
            }

            this.viagemService.updateViagem(data, viagemId);

            return ResponseEntity.ok().body("Viagem atualizada com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao registrar viagem: " + e.getMessage());
        }
    }


    @DeleteMapping("/{viagemId}")
    public ResponseEntity<?> deleteViagem(@PathVariable UUID viagemId) {
        try {
            Viagem viagem = viagemRepository.findById(viagemId)
                    .orElseThrow(() -> new RuntimeException("Viagem não encontrada"));
            if (viagem.getStatus() == StatusViagem.NaoIniciada || viagem.getStatus() == StatusViagem.EmAndamento) {
                return ResponseEntity.badRequest().body("Não é possível deletar uma viagem que está em andamento ou não inciada. Cancele-a para excluir.");
            }

            this.viagemRepository.deleteById(viagemId);

            return ResponseEntity.ok().body("Viagem excluída com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao registrar viagem: " + e.getMessage());
        }
    }

    @PostMapping("/checklist/{viagemId}")
    public ResponseEntity<?> createChecklist(@PathVariable UUID viagemId, @RequestBody @Validated ChecklistDTO data) {
        try {
            Viagem viagem = viagemRepository.findById(viagemId)
                    .orElseThrow(() -> new RuntimeException("Viagem não encontrada"));

            if (viagem.getStatus() != StatusViagem.NaoIniciada) {
                return ResponseEntity.badRequest().body("Só é possível fazer o checklist em viagens que ainda não foram iniciadas.");
            }

            var authentication = SecurityContextHolder.getContext().getAuthentication();
            var principal = authentication.getPrincipal();
            var authorities = authentication.getAuthorities();

            UUID userId = null;
            if (principal instanceof UserDetails) {
                userId = ((Usuario) principal).getId();
            }
            if (userId == null) {
                return ResponseEntity.badRequest().body("Usuário não encontrado");
            }

            // Verifica se o usuário tem a role STAFF
            boolean isStaff = authorities.stream()
                    .anyMatch(auth -> auth.getAuthority().equals("ROLE_STAFF"));

            if (isStaff && userId != viagem.getMotorista().getId()) {
                return ResponseEntity.badRequest().body("Você não tem permissão para fazer o checklist nesta viagem pois não é o motorista.");
            }

            var checkViagem = this.checklistRepository.findByViagemId(viagemId);

            if (checkViagem.isPresent()) {
                return ResponseEntity.badRequest().body("O checklist já foi realizado nesta viagem");
            }

            this.checklistService.createChecklist(data, viagem);

            return ResponseEntity.ok().body("Checklist realizado com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao fazer checklist: " + e.getMessage());
        }
    }
}
