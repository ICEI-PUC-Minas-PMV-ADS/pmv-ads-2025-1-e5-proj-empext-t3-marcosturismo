package com.marcosturismo.api.controllers;

import com.marcosturismo.api.domain.cliente.Cliente;
import com.marcosturismo.api.domain.cliente.ClienteDTO;
import com.marcosturismo.api.domain.usuario.Cnh;
import com.marcosturismo.api.domain.usuario.Usuario;
import com.marcosturismo.api.domain.viagem.Viagem;
import com.marcosturismo.api.repositories.ClienteRepository;
import com.marcosturismo.api.repositories.ViagemRepository;
import com.marcosturismo.api.services.ClienteService;
import com.marcosturismo.api.services.ViagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("cliente")
public class ClienteController {

    @Autowired
    ClienteService clienteService;

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    ViagemRepository viagemRepository;

    @GetMapping
    public ResponseEntity<?> getAllCliente() {
        try {

            List<Cliente> clientes = this.clienteService.getAllCliente();

            if (clientes.isEmpty()) {
                return ResponseEntity.noContent().build(); // Retorna 204 se não houver clientes
            }

            // Mapear clientes para incluir as suas viagens
            List<Map<String, Object>> response = clientes.stream().map(cliente -> {
                Map<String, Object> clienteMap = new HashMap<>();
                clienteMap.put("id", cliente.getId());
                clienteMap.put("nome", cliente.getNome());
                clienteMap.put("cpfCnpj", cliente.getCpfCnpj());
                clienteMap.put("telefone", cliente.getTelefone());
                clienteMap.put("endereco", cliente.getEndereco());
                clienteMap.put("dataCriacao", cliente.getDataCriacao());

                // Buscar CNH do usuário
                var viagens = viagemRepository.findByClienteId(cliente.getId());

                clienteMap.put("viagem", viagens.stream()
                        .map(Viagem::toResponseDTO)  // Simplificando o lambda
                        .toList()); // Adiciona as viagens se houver, senão fica null

                return clienteMap;
            }).toList();

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar clientes: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createCliente(@RequestBody @Validated ClienteDTO data) {
        try {

            if (this.clienteRepository.findByCpfCnpj(data.cpfCnpj()).isPresent()) {
                return ResponseEntity.badRequest().body("CPF/Cnpj já cadastrado");
            }

            this.clienteService.createCliente(data);

            return ResponseEntity.ok().body("Cliente registrado com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao registrar cliente: " + e.getMessage());
        }
    }

    @PutMapping("/{clienteId}")
    public ResponseEntity<?> updateCliente(@PathVariable UUID clienteId, @RequestBody @Validated ClienteDTO data) {
        try {
            Optional<Cliente> currentCliente = this.clienteRepository.findById(clienteId);

            if (currentCliente.isEmpty()) {
                return ResponseEntity.badRequest().body("Cliente não encontrado");
            }
            var existsCpfCnpj = this.clienteRepository.findByCpfCnpj(data.cpfCnpj());
            if (existsCpfCnpj.isPresent()) {
                if (existsCpfCnpj.get().getId() != clienteId) {
                    return ResponseEntity.badRequest().body("CPF/Cnpj já cadastrado");
                }
            }

            this.clienteService.updateCliente(data, clienteId);

            return ResponseEntity.ok().body("Cliente atualizado com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao registrar cliente: " + e.getMessage());
        }
    }

    @DeleteMapping("/{clienteId}")
    public ResponseEntity<?> deleteCliente(@PathVariable UUID clienteId) {
        try {
            this.clienteService.deleteCliente(clienteId);
            return ResponseEntity.ok().body("Cliente excluído com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
