package com.marcosturismo.api.services;

import com.marcosturismo.api.domain.cheklist_veiculo.ChecklistDTO;
import com.marcosturismo.api.domain.cheklist_veiculo.ChecklistVeiculo;
import com.marcosturismo.api.domain.veiculo.Veiculo;
import com.marcosturismo.api.domain.viagem.Viagem;
import com.marcosturismo.api.repositories.ChecklistRepository;
import com.marcosturismo.api.repositories.VeiculoRepository;
import com.marcosturismo.api.repositories.ViagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChecklistService {

    @Autowired
    ViagemRepository viagemRepository;

    @Autowired
    VeiculoRepository veiculoRepository;

    @Autowired
    ChecklistRepository checklistRepository;

    public void createChecklist(ChecklistDTO data, Viagem viagem) {
        ChecklistVeiculo checklistVeiculo = new ChecklistVeiculo(data, viagem);
        checklistRepository.save(checklistVeiculo);
    }
}
