package com.marcosturismo.api.domain.usuario;

public enum TipoUsuario {
    Motorista("Motorista"),
    Administrador("Administrador");

    private String tipo;

    TipoUsuario(String tipo){
        this.tipo = tipo;
    }

    public String getTipo() {
        return tipo;
    }
}
