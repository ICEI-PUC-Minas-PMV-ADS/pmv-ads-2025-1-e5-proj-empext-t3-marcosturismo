package com.marcosturismo.api.domain.veiculo;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.UUID;
import java.util.List;

@Entity
@Table(name = "veiculo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Veiculo {

    @Id
    @GeneratedValue
    private UUID id;

    private String numeracao;
    private String modelo;
    private String marca;
    private String anoModelo;
    private Integer kmAtual;

    @Enumerated(EnumType.STRING)
    private Situacao situacao;

    private String placa;
    private Integer kmProxTrocaOleo;
    private Integer kmProxTrocaPneu;
    private Integer lotacao;
    private String categoria;
    private Boolean arCondicionado;
    private Boolean wifi;
    private Boolean poltronaReclinavel;
    private Boolean tv;
    private Boolean geladeira;
    private Boolean sanitarios;

    public enum Situacao {
        ATIVO, INATIVO, MANUTENCAO
    }

    @OneToMany(mappedBy = "veiculo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ImagemVeiculo> imagens = new ArrayList<>();
}

