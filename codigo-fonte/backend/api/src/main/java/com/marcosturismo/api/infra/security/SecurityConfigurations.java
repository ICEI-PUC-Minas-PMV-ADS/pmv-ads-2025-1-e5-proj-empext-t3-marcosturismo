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
                        //.requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
                        /// Endpoints
                        /// Veículos
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
