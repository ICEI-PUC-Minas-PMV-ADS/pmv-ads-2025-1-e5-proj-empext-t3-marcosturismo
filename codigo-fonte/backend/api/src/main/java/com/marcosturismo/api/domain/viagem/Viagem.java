package com.marcosturismo.api.domain.viagem;

import com.marcosturismo.api.domain.cheklist_veiculo.ChecklistVeiculo;
import com.marcosturismo.api.domain.cliente.Cliente;
import com.marcosturismo.api.domain.usuario.Usuario;
import com.marcosturismo.api.domain.veiculo.Veiculo;
import com.marcosturismo.api.repositories.ChecklistRepository;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.security.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Entity
@Table(name = "viagem")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Viagem {

    @Id
    @GeneratedValue
    private UUID id;

    @Enumerated(EnumType.STRING)
    private StatusViagem status;

    private Double distancia;
    private Double valor;
    private Date dataInicio;
    private Date dataChegada;
    private String enderecoSaida;
    private String enderecoDestino;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    @Enumerated(EnumType.STRING)
    private TipoViagem tipoViagem;

    @ManyToOne
    @JoinColumn(name = "veiculo_id")
    private Veiculo veiculo;

    @ManyToOne
    @JoinColumn(name = "motorista_id")
    private Usuario motorista;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    public Viagem(ViagemDTO data, Cliente cliente, Usuario motorista, Veiculo veiculo) {
        this.status = data.status();
        this.distancia = data.distancia();
        this.valor = data.valor();
        this.dataInicio = new Date(data.dataInicio());
        this.dataChegada = new Date(data.dataChegada());
        this.enderecoSaida = data.enderecoSaida();
        this.enderecoDestino = data.enderecoDestino();
        this.tipoViagem = data.tipoViagem();
        this.veiculo = veiculo;
        this.motorista = motorista;
        this.cliente = cliente;
    }

    public ViagemResponseDTO toResponseDTO(ChecklistVeiculo check) {
        return new ViagemResponseDTO(
                this.id,
                this.status,
                this.distancia,
                this.valor,
                this.dataInicio,
                this.dataChegada,
                this.enderecoSaida,
                this.enderecoDestino,
                this.dataCriacao,
                this.tipoViagem,
                veiculo.getId(),
                veiculo.getNumeracao(),
                veiculo.getModelo(),
                veiculo.getMarca(),
                motorista.getId(),
                motorista.getStatus(),
                motorista.getNome(),
                cliente.getId(),
                cliente.getNome(),
                check != null ? check.toResponseDTO() : null
        );
    }
}
