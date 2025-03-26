package com.marcosturismo.api.domain.cheklist_veiculo;
import com.marcosturismo.api.domain.veiculo.ImagemVeiculo;
import com.marcosturismo.api.domain.veiculo.Veiculo;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.security.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
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

    private Date dataChecklist;
    private Boolean pneusOk;
    private Boolean limpezaOk;
    private Boolean avariasOk;
    private Boolean faroisOk;
    private Boolean documentoOk;
    private String ocorrencias;

    @ManyToOne
    @JoinColumn(name = "veiculo_id")
    private Veiculo veiculo;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    @OneToMany(mappedBy = "checklistVeiculo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ImagemChecklist> imagens = new ArrayList<>();
}
