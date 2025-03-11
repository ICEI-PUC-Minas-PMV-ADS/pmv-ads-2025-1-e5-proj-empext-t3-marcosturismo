package com.marcosturismo.api.domain.usuario;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;
import java.util.Date;

@Entity
@Table(name = "cnh")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cnh {

    @Id
    @GeneratedValue
    private UUID id;

    private String nome;
    private Date dataNascimento;
    private String uf;
    private String municipio;
    private Date dataEmissao;
    private Date dataValidade;
    private String rg;
    private String org;
    private String ufEmissor;
    private String cpf;
    private String numRegistro;
    private String catHabilitacao;
    private Date dataPHabilitacao;

    @OneToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
