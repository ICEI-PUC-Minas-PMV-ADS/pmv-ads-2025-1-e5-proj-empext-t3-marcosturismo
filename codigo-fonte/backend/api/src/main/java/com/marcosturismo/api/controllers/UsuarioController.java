package com.marcosturismo.api.controllers;

import com.marcosturismo.api.domain.usuario.Cnh;
import com.marcosturismo.api.domain.usuario.CnhDTO;
import com.marcosturismo.api.domain.usuario.UsuarioDTO;
import com.marcosturismo.api.domain.usuario.Usuario;
import com.marcosturismo.api.repositories.AuthRepository;
import com.marcosturismo.api.repositories.CnhRepository;
import com.marcosturismo.api.repositories.UsuarioRepository;
import com.marcosturismo.api.services.CnhService;
import com.marcosturismo.api.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("usuario")
public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    AuthRepository authRepository;

    @Autowired
    CnhRepository cnhRepository;

    @Autowired
    CnhService cnhService;

    @GetMapping
    public ResponseEntity<?> getAllUsuarios() {
        try {
            List<Usuario> usuarios = this.usuarioService.getAllUsuarios();
            if (usuarios.isEmpty()) {
                return ResponseEntity.noContent().build(); // Retorna 204 se não houver usuários
            }
            // Mapear usuários para incluir a CNH correspondente
            List<Map<String, Object>> response = usuarios.stream().map(usuario -> {
                Map<String, Object> usuarioMap = new HashMap<>();
                usuarioMap.put("id", usuario.getId());
                usuarioMap.put("nome", usuario.getNome());
                usuarioMap.put("telefone", usuario.getTelefone());
                usuarioMap.put("email", usuario.getEmail());
                usuarioMap.put("status", usuario.getStatus());
                usuarioMap.put("tipo", usuario.getTipo());
                usuarioMap.put("dataCriacao", usuario.getDataCriacao());

                // Buscar CNH do usuário
                Cnh cnh = cnhRepository.findByUsuarioId(usuario.getId()).orElse(null);
                usuarioMap.put("cnh", cnh); // Adiciona a CNH se houver, senão fica null

                return usuarioMap;
            }).toList();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar usuários: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createUsuario(@RequestBody @Validated UsuarioDTO data) {
        try {

            if (this.authRepository.findByEmail(data.email()) != null) {
                return ResponseEntity.badRequest().body("Email já cadastrado");
            }

            String encryptedSenha = new BCryptPasswordEncoder().encode(data.email());

            Usuario newUsuario = new Usuario(
                    data.email(),
                    encryptedSenha,
                    data.tipo(),
                    data.status(),
                    data.nome(),
                    data.telefone());

            this.usuarioRepository.save(newUsuario);

            return ResponseEntity.ok().body("Usuário registrado com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao registrar usuário: " + e.getMessage());
        }
    }

    @PutMapping("/{usuarioId}")
    public ResponseEntity<?> updateUsuario(@PathVariable UUID usuarioId, @RequestBody @Validated UsuarioDTO data) {
        try {

            Optional<Usuario> currentUsuario = this.usuarioRepository.findById(usuarioId);

            if (currentUsuario.isEmpty()) {
                return ResponseEntity.badRequest().body("Usuário não encontrado");
            }

            var emailUsuario = this.usuarioRepository.findByEmail(data.email());
            if (emailUsuario.isPresent()) {
                if (emailUsuario.get().getId() != currentUsuario.get().getId()) {
                    return ResponseEntity.badRequest().body("Existe um usuário cadastrado com esse email.");
                }
            }

            this.usuarioService.updateUsuario(data, usuarioId);

            return ResponseEntity.ok().body("Usuário atualizado com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao editar usuário: " + e.getMessage());
        }
    }

    @DeleteMapping("/{usuarioId}")
    public ResponseEntity<?> deleteUsuario(@PathVariable UUID usuarioId) {
        try {
            this.usuarioService.deleteUsuario(usuarioId);
            return ResponseEntity.ok().body("Usuário excluído com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping("/cnh/{usuarioId}")
    public ResponseEntity<?> createCnh(@PathVariable UUID usuarioId, @RequestBody @Validated CnhDTO data) {
        try {
            var usuario = this.usuarioRepository.findById(usuarioId);

            if (usuario.isEmpty()) {
                return ResponseEntity.badRequest().body("Usuário inválido");
            }

            if (this.cnhRepository.findByCpf(data.cpf()).isPresent()) {
                return ResponseEntity.badRequest().body("Já existe uma CNH registrada nesse CPF.");
            }

            if (this.cnhRepository.findByNumRegistro(data.numRegistro()).isPresent()) {
                return ResponseEntity.badRequest().body("Já existe uma CNH com esse número de registro.");
            }

            Cnh newCnh = new Cnh(
                    data, usuario.get()
            );

            this.cnhRepository.save(newCnh);

            return ResponseEntity.ok().body("CNH salva com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao salvar CNH: " + e.getMessage());
        }
    }

    @PutMapping("/cnh/{usuarioId}")
    public ResponseEntity<?> updateCnh(@PathVariable UUID usuarioId, @RequestBody @Validated CnhDTO data) {
        try {
            var usuario = this.usuarioRepository.findById(usuarioId);

            if (usuario.isEmpty()) {
                return ResponseEntity.badRequest().body("Usuário inválido");
            }

            Optional<Cnh> currentCnh = this.cnhRepository.findByUsuario(usuario.get());

            if (currentCnh.isEmpty()) {
                return ResponseEntity.badRequest().body("CNH desse usuário não foi encontrada");
            }

            var cnhCpfExists = this.cnhRepository.findByCpf(data.cpf());
            if (cnhCpfExists.isPresent()) {
                if (cnhCpfExists.get().getId() != currentCnh.get().getId()) {
                    return ResponseEntity.badRequest().body("Já existe uma CNH registrada nesse CPF.");
                }
            }

            var numRegistroExists = this.cnhRepository.findByNumRegistro(data.numRegistro());

            if (numRegistroExists.isPresent()) {
                if (numRegistroExists.get().getId() != currentCnh.get().getId()) {
                    return ResponseEntity.badRequest().body("Já existe uma CNH com esse número de registro.");
                }
            }


            this.cnhService.updateCnh(data, currentCnh.get().getId());

            return ResponseEntity.ok().body("CNH editada com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao editar CNH: " + e.getMessage());
        }
    }

    @DeleteMapping("/cnh/{usuarioId}")
    public ResponseEntity<?> deleteCnh(@PathVariable UUID usuarioId) {
        try {
            this.cnhService.deleteCnhByUsuario(usuarioId);
            return ResponseEntity.ok().body("CNH excluída com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
