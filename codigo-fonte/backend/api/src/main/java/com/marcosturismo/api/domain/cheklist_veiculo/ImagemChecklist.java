package com.marcosturismo.api.domain.cheklist_veiculo;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.security.Timestamp;
import java.time.LocalDateTime;
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

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;
}
