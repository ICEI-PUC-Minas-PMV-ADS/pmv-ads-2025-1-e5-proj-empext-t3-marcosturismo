package com.marcosturismo.api.domain.cheklist_veiculo;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "imagem_checklist")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImagemChecklist {

    @Id
    @GeneratedValue
    private UUID id;

    private String imgUrl;

    @ManyToOne
    @JoinColumn(name = "checklist_veiculo_id")
    private ChecklistVeiculo checklistVeiculo;

    private Date dataCriacao;
}
