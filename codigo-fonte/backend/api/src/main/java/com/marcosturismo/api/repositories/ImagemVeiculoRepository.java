package com.marcosturismo.api.repositories;

import com.marcosturismo.api.domain.veiculo.ImagemVeiculo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ImagemVeiculoRepository  extends JpaRepository<ImagemVeiculo, UUID> {
}
