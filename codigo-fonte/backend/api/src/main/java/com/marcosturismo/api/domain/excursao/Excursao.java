package com.marcosturismo.api.domain.excursao;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.security.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "excursao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Excursao {

    @Id
    @GeneratedValue
    private UUID id;

    private String titulo;
    private String descricao;
    private String imgUrl;
    private Date dataExcursao;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    public Excursao(ExcursaoDTO data) {
        this.titulo = data.titulo();
        this.descricao = data.descricao();
        this.dataExcursao = new Date(data.dataExcursao());
    }
}
