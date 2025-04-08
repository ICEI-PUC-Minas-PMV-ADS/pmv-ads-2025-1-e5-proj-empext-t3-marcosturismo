package com.marcosturismo.api.services;
import com.marcosturismo.api.domain.servico.Servico;
import com.marcosturismo.api.domain.servico.ServicoDTO;
import com.marcosturismo.api.domain.servico.TipoServico;
import com.marcosturismo.api.domain.servico.TipoServicoDTO;
import com.marcosturismo.api.repositories.TipoServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TipoServicoService {
    @Autowired
    TipoServicoRepository tipoServicoRepository;


    public TipoServico createTipoServico(TipoServicoDTO data) {
        TipoServico tipoServico = new TipoServico(data);
        return this.tipoServicoRepository.save(tipoServico);
    }

    public void deleteTipoServico (UUID id){
        if (!this.tipoServicoRepository.existsById(id)) {
            throw new RuntimeException("Tipo de serviço não encontrado");
        }
        this.tipoServicoRepository.deleteById(id);
    }

}
