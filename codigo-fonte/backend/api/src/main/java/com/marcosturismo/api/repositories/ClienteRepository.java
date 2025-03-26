package com.marcosturismo.api.repositories;

import com.marcosturismo.api.domain.cliente.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ClienteRepository extends JpaRepository<Cliente, UUID> {
    Optional<Cliente> findByCpfCnpj(String cpfCnpj);
}
