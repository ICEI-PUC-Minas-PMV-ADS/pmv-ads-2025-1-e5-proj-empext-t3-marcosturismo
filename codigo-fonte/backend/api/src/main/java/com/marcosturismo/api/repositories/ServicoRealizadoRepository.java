package com.marcosturismo.api.repositories;

import com.marcosturismo.api.domain.servico.ServicoRealizado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ServicoRealizadoRepository extends JpaRepository<ServicoRealizado, UUID> {

    List<ServicoRealizado> findByServicoId(UUID servicoId);
}
