package com.marcosturismo.api.controllers;

import com.marcosturismo.api.domain.veiculo.Veiculo;
import com.marcosturismo.api.domain.veiculo.VeiculoResponseServicoDTO;
import com.marcosturismo.api.services.DashboardService;
import com.marcosturismo.api.services.VeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/gastos-manutencao")
    public ResponseEntity<?> getGastosUltimosSeisMeses(){
        Map<String, Double> resultado = dashboardService.getGastosUltimosSeisMeses();
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/gastos-manutencao/{tipoId}")
    public ResponseEntity<?> getGastosUltimosSeisMesesPorTipoServico(@PathVariable UUID tipoId){
        Map<String, Double> resultado = dashboardService.getGastosUltimosSeisMesesPorTipoServico(tipoId);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/veiculos-ativos")
    public long contarVeiculosNaoInativos() {
        return dashboardService.contarVeiculosNaoInativos();
    }

    @GetMapping("/manutencoes-pendentes")
    public List<VeiculoResponseServicoDTO> listarManutencoesPendentes() {
        return dashboardService.listarManutencoesPendentes()
                .stream()
                .map(Veiculo::toResponseServicoDTO)
                .toList();
    }
}
