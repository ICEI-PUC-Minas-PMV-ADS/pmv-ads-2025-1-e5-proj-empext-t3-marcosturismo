package com.marcosveiculos.api.domain.viagem;

import com.marcosveiculos.api.domain.veiculo.Veiculo;
import jakarta.persistence.*;

import java.util.UUID;

@Table(name = "viagem")
@Entity
public class Viagem {
    @Id
    @GeneratedValue
    private UUID id;

    private String enderecoSaida;
    private String enderecoChegada;
    private Double distancia;

    @ManyToOne
    @JoinColumn(name = "veiculo_id")
    private Veiculo veiculo;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEnderecoSaida() {
        return enderecoSaida;
    }

    public void setEnderecoSaida(String enderecoSaida) {
        this.enderecoSaida = enderecoSaida;
    }

    public String getEnderecoChegada() {
        return enderecoChegada;
    }

    public void setEnderecoChegada(String enderecoChegada) {
        this.enderecoChegada = enderecoChegada;
    }

    public Double getDistancia() {
        return distancia;
    }

    public void setDistancia(Double distancia) {
        this.distancia = distancia;
    }

    public Veiculo getVeiculo() {
        return veiculo;
    }

    public void setVeiculo(Veiculo veiculo) {
        this.veiculo = veiculo;
    }

}
