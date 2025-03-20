package com.marcosturismo.api.repositories;

import com.marcosturismo.api.domain.excursao.Excursao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface ExcursaoRepository  extends JpaRepository<Excursao, UUID> {
    List<Excursao> findByDataExcursaoAfter(Date dataAtual);
}
