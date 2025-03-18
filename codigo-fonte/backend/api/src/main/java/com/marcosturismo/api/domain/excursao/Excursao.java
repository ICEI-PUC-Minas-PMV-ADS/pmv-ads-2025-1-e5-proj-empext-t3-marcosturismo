package com.marcosturismo.api.domain.excursao;
import jakarta.persistence.*;
import lombok.*;

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
    private Date dataCriacao;
}
