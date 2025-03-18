package com.marcosturismo.api.services;

import com.marcosturismo.api.domain.usuario.Usuario;
import com.marcosturismo.api.domain.usuario.UsuarioDTO;
import com.marcosturismo.api.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    public List<Usuario> getAllUsuarios(){
        return usuarioRepository.findAll();
    }

    public void deleteUsuario(UUID id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado");
        }
        usuarioRepository.deleteById(id);
    }

    public Usuario updateUsuario(UsuarioDTO data, UUID id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        usuario.setNome(data.nome());
        usuario.setEmail(data.email());
        usuario.setStatus(data.status());
        usuario.setTipo(data.tipo());
        usuario.setTelefone(data.telefone());

        return usuarioRepository.save(usuario);
    }
}
