package com.marcosturismo.api.domain.usuario;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
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
    private LocalDate dataNascimento;
    private String uf;
    private String municipio;
    private LocalDate dataEmissao;
    private LocalDate dataValidade;
    private String rg;
    private String org;
    private String ufEmissor;
    private String cpf;
    private String numRegistro;
    private String catHabilitacao;
    @Column(name = "data_p_habilitacao")
    private LocalDate dataPHabilitacao;
    private Date dataCriacao;

    @JsonIgnore
    @OneToOne()
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public Cnh(CnhDTO data, Usuario usuario) {
        this.nome = data.nome();
        this.dataNascimento = LocalDate.parse(data.dataNascimento());
        this.uf = data.uf();
        this.municipio = data.municipio();
        this.dataEmissao =LocalDate.parse(data.dataEmissao());
        this.dataValidade = LocalDate.parse(data.dataValidade());
        this.rg = data.rg();
        this.org = data.org();
        this.ufEmissor = data.ufEmissor();
        this.cpf = data.cpf();
        this.numRegistro = data.numRegistro();
        this.catHabilitacao = data.catHabilitacao();
        this.usuario = usuario;
    }
}
