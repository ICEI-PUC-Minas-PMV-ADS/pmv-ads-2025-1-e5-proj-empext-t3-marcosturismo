package com.marcosturismo.api.domain.usuario;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue
    private UUID id;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String nome;
    private String telefone;

    @Enumerated(EnumType.STRING)
    private Tipo tipo;

    private String descricao;
    private String email;
    private String senha;
    private String imgUrl;

    public enum Status {
        ATIVO, EM_SERVICO, INATIVO
    }

    public enum Tipo {
        MOTORISTA, MECANICO, ADMINISTRADOR
    }
}
