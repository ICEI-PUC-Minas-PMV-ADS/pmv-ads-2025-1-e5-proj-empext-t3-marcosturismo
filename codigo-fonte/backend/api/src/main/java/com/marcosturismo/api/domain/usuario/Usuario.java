package com.marcosturismo.api.domain.usuario;

import com.marcosturismo.api.domain.cheklist_veiculo.ImagemChecklist;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity
@Table(name = "usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    private StatusUsuario status;

    private String nome;
    private String telefone;

    @Enumerated(EnumType.STRING)
    private TipoUsuario tipo;

    private String email;
    private String senha;
    private Date dataCriacao;

    public Usuario(
            String email,
            String senha,
            TipoUsuario tipo,
            StatusUsuario status,
            String nome,
            String telefone
    ) {
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
        this.status = status;
        this.nome = nome;
        this.telefone = telefone;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.tipo == TipoUsuario.Administrador)
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
        else return List.of(new SimpleGrantedAuthority(
                "ROLE_STAFF"
        ));
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
