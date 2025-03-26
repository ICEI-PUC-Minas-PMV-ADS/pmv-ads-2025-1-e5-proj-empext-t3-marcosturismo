package com.marcosturismo.api.domain.avaliacao;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.security.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "avaliacao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Avaliacao {

    @Id
    @GeneratedValue
    private UUID id;

    private String autor;
    private String titulo;
    private String descricao;
    private Double nota;

    @Enumerated(EnumType.STRING)
    private StatusAvaliacao status;

    private Date dataPublicacao;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    public Avaliacao(AvaliacaoDTO data){
        this.autor = data.autor();
        this.titulo = data.titulo();
        this.descricao = data.descricao();
        this.nota = data.nota();
        this.status = StatusAvaliacao.AValidar;
        this.dataPublicacao = new Date(data.dataPublicacao());
    }
}

