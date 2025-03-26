package com.marcosturismo.api.domain.viagem;

public enum StatusViagem {
    Finalizada("Finalizada"), NaoIniciada("NaoIniciada"), Cancelada("Cancelada"), EmAndamento("EmAndamento");
    private String status;

    StatusViagem(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
