package com.marcosturismo.api.services;

import com.marcosturismo.api.domain.cliente.Cliente;
import com.marcosturismo.api.domain.cliente.ClienteDTO;
import com.marcosturismo.api.domain.veiculo.Veiculo;
import com.marcosturismo.api.domain.veiculo.VeiculoDTO;
import com.marcosturismo.api.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ClienteService {

    @Autowired
    ClienteRepository clienteRepository;

    public List<Cliente> getAllCliente() {
        return this.clienteRepository.findAll();
    }

    public void updateCliente(ClienteDTO data, UUID clienteId){
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        cliente.setNome(data.nome());
        cliente.setEndereco(data.endereco());
        cliente.setCpfCnpj(data.cpfCnpj());
        cliente.setTelefone(data.telefone());

        this.clienteRepository.save(cliente);
    }

    public Cliente createCliente(ClienteDTO data) {
        Cliente cliente = new Cliente(data);
        return this.clienteRepository.save(cliente);
    }

    public void deleteCliente (UUID id){
        if (!this.clienteRepository.existsById(id)) {
            throw new RuntimeException("Cliente não encontrado");
        }
        this.clienteRepository.deleteById(id);
    }
}
