package com.marcosturismo.api.services;

import com.marcosturismo.api.domain.excursao.Excursao;
import com.marcosturismo.api.domain.excursao.ExcursaoDTO;
import com.marcosturismo.api.repositories.ExcursaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.UUID;

@Service
public class ExcursaoService {
    @Value("${storage.path}")
    private String path;

    @Value("${storage.urlStorage}")
    private String urlStorage;

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

    public void deleteExcursao(UUID excursaoId) {
        Excursao excursao = excursaoRepository.findById(excursaoId)
                .orElseThrow(() -> new RuntimeException("Excursão não encontrada"));

        // Remove imagem se existir
        if (excursao.getImgUrl() != null) {
            String nomeArquivo = excursao.getImgUrl().replace(urlStorage, "");
            Path caminho = Paths.get(path, nomeArquivo);
            try {
                Files.deleteIfExists(caminho);
            } catch (IOException e) {
                throw new RuntimeException("Erro ao deletar imagem associada à excursão.");
            }
        }

        excursaoRepository.delete(excursao);
    }
}
