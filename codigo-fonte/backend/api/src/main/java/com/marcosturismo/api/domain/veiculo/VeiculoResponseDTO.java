package com.marcosturismo.api.domain.veiculo;

import com.marcosturismo.api.domain.cheklist_veiculo.ChecklistResponseViagemDTO;
import com.marcosturismo.api.domain.cheklist_veiculo.ChecklistVeiculo;

public record VeiculoResponseDTO(
        Veiculo veiculo,
        ChecklistResponseViagemDTO checklist
) {
}
