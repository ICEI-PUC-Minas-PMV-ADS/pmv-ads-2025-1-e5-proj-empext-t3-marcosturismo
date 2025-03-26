package com.marcosturismo.api.repositories;

import com.marcosturismo.api.domain.viagem.Viagem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ViagemRepository extends JpaRepository<Viagem, UUID> {

    List<Viagem> findByMotoristaId(UUID id);
    List<Viagem> findByClienteId(UUID id);

}
