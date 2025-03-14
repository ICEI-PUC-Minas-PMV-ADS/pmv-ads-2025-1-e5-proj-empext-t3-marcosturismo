package com.marcosturismo.api.repositories;

import com.marcosturismo.api.domain.avaliacao.Avaliacao;
import com.marcosturismo.api.domain.avaliacao.StatusAvaliacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, UUID> {

    Optional<List<Avaliacao>> findByStatus(StatusAvaliacao status);
}
