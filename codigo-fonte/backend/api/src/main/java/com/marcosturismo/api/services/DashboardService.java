package com.marcosturismo.api.services;

import com.marcosturismo.api.domain.servico.ServicoRealizado;
import com.marcosturismo.api.domain.veiculo.Veiculo;
import com.marcosturismo.api.repositories.ServicoRealizadoRepository;
import com.marcosturismo.api.repositories.TipoServicoRepository;
import com.marcosturismo.api.repositories.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class DashboardService {

    @Autowired
    ServicoRealizadoRepository servicoRealizadoRepository;

    @Autowired
    TipoServicoRepository tipoServicoRepository;

    @Autowired
    VeiculoRepository veiculoRepository;

    public Map<String, Double> getGastosUltimosSeisMeses() {

        int meses = 5;
        LocalDate hoje = LocalDate.now();
        LocalDate seisMesesAtras = hoje.minusMonths(meses).withDayOfMonth(1);

        List<ServicoRealizado> servicos = servicoRealizadoRepository
                .findAllByServicoDataFromLastSixMonths(seisMesesAtras);

        Map<String, Double> gastosPorMes = getGastosPorMes(meses);

        for (ServicoRealizado sr : servicos) {
            LocalDate data = sr.getServico().getDataServico();
            String chaveMes = String.format("%02d-%d", data.getMonthValue(), data.getYear());

            gastosPorMes.merge(chaveMes, sr.getCusto(), Double::sum);
        }

        return gastosPorMes;
    }

    public Map<String, Double> getGastosUltimosSeisMesesPorTipoServico(UUID tipoServico) {
        if (!this.tipoServicoRepository.existsById(tipoServico)) {
            throw new RuntimeException("Tipo de serviço não encontrado");
        }
        int meses = 5;
        LocalDate hoje = LocalDate.now();
        LocalDate seisMesesAtras = hoje.minusMonths(meses).withDayOfMonth(1);
        List<ServicoRealizado> servicos = servicoRealizadoRepository
                .findAllByServicoDataFromLastSixMonthsAndTipoServico(seisMesesAtras, tipoServico);

        Map<String, Double> gastosPorMes = getGastosPorMes(meses);

        for (ServicoRealizado sr : servicos) {
            LocalDate data = sr.getServico().getDataServico();
            String chaveMes = String.format("%02d-%d", data.getMonthValue(), data.getYear());

            gastosPorMes.merge(chaveMes, sr.getCusto(), Double::sum);
        }

        return gastosPorMes;
    }

    public long contarVeiculosNaoInativos() {
        return veiculoRepository.countVeiculosNaoInativos();
    }

    private Map<String, Double> getGastosPorMes(int meses) {

        LocalDate hoje = LocalDate.now();
        LocalDate seisMesesAtras = hoje.minusMonths(meses).withDayOfMonth(1);

        Map<String, Double> gastosPorMes = new LinkedHashMap<>();
        for (int i = 0; i < (meses + 1); i++) {
            LocalDate mes = seisMesesAtras.plusMonths(i);
            String chave = String.format("%02d-%d", mes.getMonthValue(), mes.getYear());
            gastosPorMes.put(chave, 0.0);
        }

        return gastosPorMes;
    }

    public List<Veiculo> listarManutencoesPendentes() {
        return veiculoRepository.findVeiculosComManutencaoPendente();
    }
}
