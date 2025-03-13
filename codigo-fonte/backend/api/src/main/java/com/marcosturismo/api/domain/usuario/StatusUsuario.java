package com.marcosturismo.api.domain.usuario;

public enum StatusUsuario {
    Ativo("Ativo"), EmServico("EmServico"), Inativo("Inativo");

    private String status;

    StatusUsuario(String status){
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
