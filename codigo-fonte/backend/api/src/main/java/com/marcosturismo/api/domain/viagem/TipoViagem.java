package com.marcosturismo.api.domain.viagem;

public enum TipoViagem {
    Excursao("Excursao"), Fretamento("Fretamento");
    private String status;
    TipoViagem(String status){
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
