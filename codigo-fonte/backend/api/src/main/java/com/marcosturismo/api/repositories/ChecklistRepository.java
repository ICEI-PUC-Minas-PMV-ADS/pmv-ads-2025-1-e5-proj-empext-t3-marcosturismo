package com.marcosturismo.api.repositories;

import com.marcosturismo.api.domain.cheklist_veiculo.ChecklistVeiculo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ChecklistRepository extends JpaRepository<ChecklistVeiculo, UUID> {
    Optional<ChecklistVeiculo> findByViagemId(UUID viagemId);
    Optional<ChecklistVeiculo> findFirstByVeiculoIdOrderByDataCriacaoDesc(UUID veiculoId);
}
