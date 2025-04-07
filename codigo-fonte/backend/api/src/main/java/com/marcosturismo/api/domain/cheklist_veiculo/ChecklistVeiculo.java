package com.marcosturismo.api.domain.cheklist_veiculo;

import com.marcosturismo.api.domain.veiculo.Veiculo;
import com.marcosturismo.api.domain.viagem.Viagem;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "checklist_veiculo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChecklistVeiculo {

    @Id
    @GeneratedValue
    private UUID id;

    private LocalDate dataChecklist;
    private Boolean pneusOk;
    private Boolean limpezaOk;
    private Boolean avariasOk;
    private Boolean faroisOk;
    private Boolean documentoOk;
    private String ocorrencias;

    @ManyToOne
    @JoinColumn(name = "viagem_id")
    private Viagem viagem;

    @ManyToOne
    @JoinColumn(name = "veiculo_id")
    private Veiculo veiculo;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    @OneToMany(mappedBy = "checklistVeiculo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ImagemChecklist> imagens = new ArrayList<>();

    public ChecklistVeiculo(ChecklistDTO data, Viagem viagem) {
        this.dataChecklist = LocalDate.parse(data.dataChecklist());
        this.pneusOk = data.pneusOk();
        this.limpezaOk = data.limpezaOk();
        this.avariasOk = data.avariasOk();
        this.faroisOk = data.faroisOk();
        this.documentoOk = data.documentoOk();
        this.ocorrencias = data.ocorrencias();
        this.viagem = viagem;
        this.veiculo = viagem.getVeiculo();
    }

    public ChecklistResponseViagemDTO toResponseDTO() {
        return new ChecklistResponseViagemDTO(
                this.id,
                this.dataChecklist,
                this.pneusOk,
                this.limpezaOk,
                this.avariasOk,
                this.faroisOk,
                this.documentoOk,
                this.ocorrencias,
                this.dataCriacao
        );
    }
}
