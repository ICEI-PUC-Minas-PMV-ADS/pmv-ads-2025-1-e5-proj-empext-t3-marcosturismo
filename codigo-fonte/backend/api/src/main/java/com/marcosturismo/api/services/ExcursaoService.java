package com.marcosturismo.api.services;

import com.marcosturismo.api.domain.excursao.Excursao;
import com.marcosturismo.api.domain.excursao.ExcursaoDTO;
import com.marcosturismo.api.repositories.ExcursaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class ExcursaoService {
    @Autowired
    ExcursaoRepository excursaoRepository;

    public Excursao updateExcursao(UUID excursaoId, ExcursaoDTO data) {
        Excursao excursao = excursaoRepository.findById(excursaoId)
                .orElseThrow(() -> new RuntimeException("Excursão não encontrada"));

        excursao.setTitulo(data.titulo());
        excursao.setDescricao(data.descricao());
        excursao.setDataExcursao(new Date(data.dataExcursao()));

        return excursaoRepository.save(excursao);
    }

    public void deleteExcursao(UUID id) {
        if (!excursaoRepository.existsById(id)) {
            throw new RuntimeException("Excursão não encontrada");
        }
        excursaoRepository.deleteById(id);
    }
}
