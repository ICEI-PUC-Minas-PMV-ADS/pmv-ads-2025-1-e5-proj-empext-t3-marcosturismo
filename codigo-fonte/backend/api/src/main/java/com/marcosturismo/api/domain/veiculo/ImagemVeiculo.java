package com.marcosturismo.api.domain.veiculo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.security.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "imagem_veiculo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImagemVeiculo {

    @Id
    @GeneratedValue
    private UUID id;

    private String imgUrl;

    @ManyToOne
    @JoinColumn(name = "veiculo_id")
    @JsonBackReference
    private Veiculo veiculo;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    public ImagemVeiculo(String imgUrl, Veiculo veiculo) {
        this.imgUrl = imgUrl;
        this.veiculo = veiculo;
    }
}

