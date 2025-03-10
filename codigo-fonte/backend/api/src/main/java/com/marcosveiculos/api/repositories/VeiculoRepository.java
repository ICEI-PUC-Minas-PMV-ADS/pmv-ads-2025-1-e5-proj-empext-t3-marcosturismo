package com.marcosveiculos.api.repositories;

import com.marcosveiculos.api.domain.veiculo.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VeiculoRepository extends JpaRepository<Veiculo, UUID> {
}
