package com.marcosturismo.api.services;

import com.marcosturismo.api.domain.usuario.Cnh;
import com.marcosturismo.api.domain.usuario.CnhDTO;
import com.marcosturismo.api.domain.usuario.Usuario;
import com.marcosturismo.api.domain.usuario.UsuarioDTO;
import com.marcosturismo.api.repositories.CnhRepository;
import com.marcosturismo.api.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Service
public class CnhService {

    @Autowired
    CnhRepository cnhRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    public void deleteCnhByUsuario(UUID usuarioId) {
        var usuario = usuarioRepository.findById(usuarioId);

        if (usuario.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }
        var cnhUsuario = cnhRepository.findByUsuario(usuario.get());

        if (cnhUsuario.isEmpty()) {
            throw new RuntimeException("CNH não encontrada");
        }
        cnhRepository.deleteById(cnhUsuario.get().getId());
    }

    public Cnh updateCnh(CnhDTO data, UUID id) {
        Cnh cnh = cnhRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CNH não encontrada"));
        cnh.setNome(data.nome());
        cnh.setDataNascimento(LocalDate.parse(data.dataValidade()));
        cnh.setUf(data.uf());
        cnh.setMunicipio(data.municipio());
        cnh.setDataEmissao(LocalDate.parse(data.dataEmissao()));
        cnh.setDataValidade(LocalDate.parse(data.dataValidade()));
        cnh.setRg(data.rg());
        cnh.setOrg(data.org());
        cnh.setUfEmissor(data.ufEmissor());
        cnh.setCpf(data.cpf());
        cnh.setNumRegistro(data.numRegistro());
        cnh.setCatHabilitacao(data.catHabilitacao());
        cnh.setDataPHabilitacao(LocalDate.parse(data.dataPHabilitacao()));

        return cnhRepository.save(cnh);
    }
}
