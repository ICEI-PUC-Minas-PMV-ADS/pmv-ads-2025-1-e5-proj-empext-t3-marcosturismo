package com.marcosturismo.api.repositories;

import com.marcosturismo.api.domain.usuario.Cnh;
import com.marcosturismo.api.domain.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CnhRepository extends JpaRepository<Cnh, UUID> {

    Optional<Cnh> findByCpf(String cpf);

    Optional<Cnh> findByNumRegistro(String numRegistro);

    Optional<Cnh> findByUsuario(Usuario usuario);

    void deleteByUsuarioId(UUID usuarioId);

    Optional<Cnh> findByUsuarioId(UUID usuarioId);
}
