package com.marcosturismo.api.domain.cliente;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "cliente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cliente {

    @Id
    @GeneratedValue
    private UUID id;

    private String nome;
    private String cpfCnpj;
    private String telefone;
    private String endereco;
}
