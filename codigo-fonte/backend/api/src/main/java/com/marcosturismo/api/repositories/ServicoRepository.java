package com.marcosturismo.api.repositories;

import com.marcosturismo.api.domain.servico.Servico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ServicoRepository extends JpaRepository<Servico, UUID> {
}
