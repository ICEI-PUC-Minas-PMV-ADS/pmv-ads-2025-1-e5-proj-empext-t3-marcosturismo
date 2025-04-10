package com.marcosturismo.api.repositories;

import com.marcosturismo.api.domain.veiculo.SituacaoVeiculo;
import com.marcosturismo.api.domain.veiculo.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface VeiculoRepository extends JpaRepository<Veiculo, UUID> {
    Optional<Veiculo> findByPlaca(String placa);
    Optional<Veiculo> findByNumeracao(String numeracao);
    List<Veiculo> findBySituacaoNot(SituacaoVeiculo situacao);
    @Query("SELECT COUNT(v) FROM Veiculo v WHERE v.situacao <> 'Inativo'")
    long countVeiculosNaoInativos();
    @Query("""
    SELECT v FROM Veiculo v 
    WHERE 
        (v.kmProxTrocaOleo IS NOT NULL AND v.kmAtual >= v.kmProxTrocaOleo - 3000)
        OR
        (v.kmProxTrocaPneu IS NOT NULL AND v.kmAtual >= v.kmProxTrocaPneu - 3000)
        AND
        v.situacao <> 'Inativo'
    """)
    List<Veiculo> findVeiculosComManutencaoPendente();
}
