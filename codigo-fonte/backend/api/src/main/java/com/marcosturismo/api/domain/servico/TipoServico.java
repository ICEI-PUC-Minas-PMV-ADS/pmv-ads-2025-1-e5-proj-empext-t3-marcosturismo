package com.marcosturismo.api.domain.servico;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.security.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;
@Entity
@Table(name = "tipo_servico")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TipoServico {

    @Id
    @GeneratedValue
    private UUID id;

    private String descricao;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;
}
