package com.marcosveiculos.api.domain.veiculo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Table(name= "veiculo")
@Entity
public class Veiculo {
    @Id
    @GeneratedValue
    private UUID id;

    private String modelo;
    private String marca;
    private Integer kmAtual;
    private String anoModelo;
    private Boolean arCondicionado;
    private Boolean wifi;
    private Boolean poltronaReclinavel;
    private Boolean tv;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public Integer getKmAtual() {
        return kmAtual;
    }

    public void setKmAtual(Integer kmAtual) {
        this.kmAtual = kmAtual;
    }

    public String getAnoModelo() {
        return anoModelo;
    }

    public void setAnoModelo(String anoModelo) {
        this.anoModelo = anoModelo;
    }

    public Boolean getArCondicionado() {
        return arCondicionado;
    }

    public void setArCondicionado(Boolean arCondicionado) {
        this.arCondicionado = arCondicionado;
    }

    public Boolean getWifi() {
        return wifi;
    }

    public void setWifi(Boolean wifi) {
        this.wifi = wifi;
    }

    public Boolean getPoltronaReclinavel() {
        return poltronaReclinavel;
    }

    public void setPoltronaReclinavel(Boolean poltronaReclinavel) {
        this.poltronaReclinavel = poltronaReclinavel;
    }

    public Boolean getTv() {
        return tv;
    }

    public void setTv(Boolean tv) {
        this.tv = tv;
    }
}
