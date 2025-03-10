package com.marcosveiculos.api.controllers;

import com.marcosveiculos.api.domain.veiculo.Veiculo;
import com.marcosveiculos.api.domain.veiculo.VeiculoRequestDTO;
import com.marcosveiculos.api.domain.viagem.Viagem;
import com.marcosveiculos.api.domain.viagem.ViagemRequestDTO;
import com.marcosveiculos.api.service.viagem.ViagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/viagem")
public class ViagemController {
    @Autowired
    private ViagemService viagemService;


    @PostMapping("/veiculo/{veiculoId}")
    public ResponseEntity<Viagem> create(@PathVariable UUID veiculoId, @RequestBody ViagemRequestDTO body) {

        Viagem newViagem = this.viagemService.createViagem(veiculoId, body);
        return ResponseEntity.ok(newViagem);
    }
}
