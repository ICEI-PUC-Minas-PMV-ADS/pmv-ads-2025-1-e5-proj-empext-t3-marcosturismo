package com.marcosturismo.api.domain.avaliacao;

import jakarta.persistence.*;
import lombok.*;

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
    private Status status;

    private Date dataPublicacao;

    public enum Status {
        VALIDA, INVALIDA
    }
}

