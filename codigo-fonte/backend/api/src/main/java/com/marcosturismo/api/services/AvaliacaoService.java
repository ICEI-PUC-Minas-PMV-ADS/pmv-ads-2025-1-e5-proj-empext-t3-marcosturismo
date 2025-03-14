package com.marcosturismo.api.services;

import com.marcosturismo.api.domain.avaliacao.Avaliacao;
import com.marcosturismo.api.domain.avaliacao.AvaliacaoDTO;
import com.marcosturismo.api.domain.avaliacao.StatusAvaliacao;
import com.marcosturismo.api.domain.veiculo.Veiculo;
import com.marcosturismo.api.repositories.AvaliacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AvaliacaoService {

    @Autowired
    AvaliacaoRepository avaliacaoRepository;

    public List<Avaliacao> getAllAvaliacoes(){
        return avaliacaoRepository.findAll();
    }

    public Optional<List<Avaliacao>> getAllAvaliacoesValidas(){
        return avaliacaoRepository.findByStatus(StatusAvaliacao.Valida);
    }

    public Avaliacao createAvaliacao(AvaliacaoDTO data){
        Avaliacao avaliacao = new Avaliacao(data);
        return avaliacaoRepository.save(avaliacao);
    }

    public Avaliacao validAvaliacao(UUID avaliacaoId){
        Avaliacao avaliacao = avaliacaoRepository.findById(avaliacaoId)
                .orElseThrow(() -> new RuntimeException("Avaliação não encontrada"));
        avaliacao.setStatus(StatusAvaliacao.Valida);
        return avaliacaoRepository.save(avaliacao);
    }

    public void deleteAvaliacao(UUID id) {
        if (!avaliacaoRepository.existsById(id)) {
            throw new RuntimeException("Avaiação não encontrada");
        }
        avaliacaoRepository.deleteById(id);
    }

}
