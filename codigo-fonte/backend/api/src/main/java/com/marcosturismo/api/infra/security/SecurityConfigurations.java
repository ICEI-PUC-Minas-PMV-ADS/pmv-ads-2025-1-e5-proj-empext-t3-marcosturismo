package com.marcosturismo.api.infra.security;

import com.marcosturismo.api.controllers.AuthenticationController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {
    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        /// Validações de authenticação
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        ///
                        /// Endpoints
                        ///
                        /// Veículos
                        .requestMatchers(HttpMethod.GET, "/veiculo/frota").permitAll()
                        .requestMatchers(HttpMethod.GET, "/veiculo").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/veiculo").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/veiculo/{veiculoId}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/veiculo/{veiculoId}").hasRole("ADMIN")
                        ///  Avaliações
                        .requestMatchers(HttpMethod.POST, "/avaliacao").permitAll()
                        .requestMatchers(HttpMethod.GET, "/avaliacao/validas").permitAll()
                        .requestMatchers(HttpMethod.GET, "/avaliacao").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/avaliacao/validar/{avaliacaoId}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/avaliacao/{avaliacaoId}").hasRole("ADMIN")
                        ///  Usuários
                        ///.requestMatchers(HttpMethod.POST, "/usuario").hasRole("ADMIN")
                        ///
                        /// Para o primeira vez que for rodar, descomentar para criar usuário
                        ///
                        .requestMatchers(HttpMethod.POST, "/usuario").permitAll()
                        ///.requestMatchers(HttpMethod.GET, "/usuario").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/usuario/{usuarioId}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/usuario/{usuarioId}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/usuario/cnh/{usuarioId}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/usuario/cnh/{usuarioId}").hasRole("ADMIN")
                        /// Excursões
                        .requestMatchers(HttpMethod.POST, "/excursao").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/excursao/upcoming").permitAll()
                        .requestMatchers(HttpMethod.GET, "/excursao").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/excursao/{excursaoId}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/excursao/{excursaoId}").hasRole("ADMIN")
                        ///  Viagens
                        .requestMatchers(HttpMethod.GET, "/viagem").authenticated()
                        .requestMatchers(HttpMethod.POST, "/viagem").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/viagem/{viagemId}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/viagem/{viagemId}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/viagem/cancelar/{viagemId}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/viagem/finalizar/{viagemId}").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/viagem/iniciar/{viagemId}").authenticated()
                        ///  Clientes
                        .requestMatchers(HttpMethod.GET, "/cliente").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/cliente").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/cliente/{clienteId}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/cliente/{clienteId}").hasRole("ADMIN")
                        .anyRequest().authenticated())
                ///  Tipos de roles: ADMIN / USER / STAFF (Motoristas)
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws
            Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
