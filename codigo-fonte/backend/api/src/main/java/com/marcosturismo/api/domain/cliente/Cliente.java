package com.marcosturismo.api.domain.cliente;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.security.Timestamp;
import java.time.LocalDateTime;
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
    @Column(name = "cpf_cnpj", updatable = false)
    private String cpfCnpj;
    private String telefone;
    private String endereco;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    public Cliente(ClienteDTO data) {
        this.nome = data.nome();
        this.cpfCnpj = data.cpfCnpj();
        this.telefone = data.telefone();
        this.endereco = data.endereco();
    }
}
