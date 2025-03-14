package com.marcosturismo.api.repositories;

import com.marcosturismo.api.domain.veiculo.SituacaoVeiculo;
import com.marcosturismo.api.domain.veiculo.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface VeiculoRepository extends JpaRepository<Veiculo, UUID> {
    Optional<Veiculo> findByPlaca(String placa);
    Optional<Veiculo> findByNumeracao(String numeracao);
    List<Veiculo> findBySituacaoNot(SituacaoVeiculo situacao);
}
