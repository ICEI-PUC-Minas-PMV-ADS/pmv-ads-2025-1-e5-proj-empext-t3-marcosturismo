package com.marcosturismo.api.repositories;

import com.marcosturismo.api.domain.servico.TipoServico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface TipoServicoRepository extends JpaRepository<TipoServico, UUID> {

    @Query("SELECT t FROM TipoServico t WHERE LOWER(t.descricao) = LOWER(:descricao)")
    Optional<TipoServico> findByDescricaoIgnoreCase(@Param("descricao") String descricao);
}
