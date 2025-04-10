package com.marcosturismo.api.repositories;

import com.marcosturismo.api.domain.servico.ServicoRealizado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface ServicoRealizadoRepository extends JpaRepository<ServicoRealizado, UUID> {

    List<ServicoRealizado> findByServicoId(UUID servicoId);

    @Query("""
    SELECT sr FROM ServicoRealizado sr
    JOIN sr.servico s
    WHERE s.dataServico >= :inicio
    """)
    List<ServicoRealizado> findAllByServicoDataFromLastSixMonths(@Param("inicio") LocalDate inicio);

    @Query("""
    SELECT sr FROM ServicoRealizado sr
    JOIN sr.servico s
    WHERE s.dataServico >= :inicio
    AND sr.tipoServico.id = :tipoServicoId
    """)
    List<ServicoRealizado> findAllByServicoDataFromLastSixMonthsAndTipoServico(
            @Param("inicio") LocalDate inicio,
            @Param("tipoServicoId") UUID tipoServicoId
    );
}
