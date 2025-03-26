package com.marcosturismo.api.domain.veiculo;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.security.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
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
    private SituacaoVeiculo situacao;

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

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    @OneToMany(mappedBy = "veiculo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ImagemVeiculo> imagens = new ArrayList<>();

    public Veiculo(VeiculoDTO data) {
        this.numeracao = data.numeracao();
        this.modelo = data.modelo();
        this.marca = data.marca();
        this.anoModelo = data.anoModelo();
        this.kmAtual = data.kmAtual();
        this.situacao = data.situacao();
        this.placa = data.placa();
        this.kmProxTrocaOleo = data.kmProxTrocaOleo();
        this.kmProxTrocaPneu = data.kmProxTrocaPneu();
        this.lotacao = data.lotacao();
        this.categoria = data.categoria();
        this.arCondicionado = data.arCondicionado();
        this.wifi = data.wifi();
        this.poltronaReclinavel = data.poltronaReclinavel();
        this.tv = data.tv();
        this.geladeira = data.geladeira();
        this.sanitarios = data.sanitarios();
    }
}

