package com.marcosturismo.api.domain.viagem;
import com.marcosturismo.api.domain.cliente.Cliente;
import com.marcosturismo.api.domain.usuario.Usuario;
import com.marcosturismo.api.domain.veiculo.Veiculo;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
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
    private Status status;

    private Double distancia;
    private Double valor;
    private Date dataInicio;
    private Date dataChegada;
    private String enderecoSaida;
    private String enderecoDestino;

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

    public enum Status {
        FINALIZADA, NAO_INICIADA, CANCELADA
    }

    public enum TipoViagem {
        EXCURSAO, FRETAMENTO
    }
}
