package com.marcosveiculos.api.repositories;

import com.marcosveiculos.api.domain.viagem.Viagem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ViagemRepository extends JpaRepository<Viagem, UUID> {
}
