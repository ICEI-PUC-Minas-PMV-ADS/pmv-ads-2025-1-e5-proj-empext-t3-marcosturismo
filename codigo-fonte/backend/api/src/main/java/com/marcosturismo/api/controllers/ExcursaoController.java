package com.marcosturismo.api.controllers;

import com.marcosturismo.api.domain.excursao.Excursao;
import com.marcosturismo.api.domain.excursao.ExcursaoDTO;
import com.marcosturismo.api.domain.usuario.Usuario;
import com.marcosturismo.api.repositories.ExcursaoRepository;
import com.marcosturismo.api.services.ExcursaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("excursao")
public class ExcursaoController {

    @Value("${storage.path}")
    private String path;

    @Value("${storage.urlStorage}")
    private String urlStorage;

    @Autowired
    ExcursaoService excursaoService;

    @Autowired
    ExcursaoRepository excursaoRepository;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createExcursao(
            @RequestParam("titulo") String titulo,
            @RequestParam("descricao") String descricao,
            @RequestParam("dataExcursao") String dataExcursao,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            // Verifica tamanho
            if (file.getSize() > 10 * 1024 * 1024) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Arquivo excede o tamanho máximo permitido de 10MB.");
            }

            // Verifica extensão
            String originalFilename = file.getOriginalFilename();
            String extensao = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extensao = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            String contentType = file.getContentType();
            if (!List.of("image/jpeg", "image/png", "image/webp").contains(contentType)) {
                return ResponseEntity.badRequest().body("Tipo de imagem não suportado.");
            }

            // Gera nome do arquivo
            String nomeArquivo = UUID.randomUUID().toString() + extensao;

            // Salva o arquivo
            Path caminho = Paths.get(path + nomeArquivo);
            Files.copy(file.getInputStream(), caminho, StandardCopyOption.REPLACE_EXISTING);

            String urlImagem = urlStorage + nomeArquivo;

            // Cria excursão com a URL da imagem
            Excursao excursao = Excursao.builder()
                    .titulo(titulo)
                    .descricao(descricao)
                    .dataExcursao(new Date(Long.parseLong(dataExcursao)))
                    .imgUrl(urlImagem)
                    .build();

            excursaoRepository.save(excursao);

            return ResponseEntity.ok("Excursão registrada com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao registrar excursão: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllExcursao() {
        try {
            List<Excursao> excursoes = this.excursaoRepository.findAll();
            if (excursoes.isEmpty()) {
                return ResponseEntity.noContent().build(); // Retorna 204 se não houver excursões
            }
            return ResponseEntity.ok(excursoes);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar excursões: " + e.getMessage());
        }
    }

    @PutMapping(value = "/{excursaoId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateExcursao(
            @PathVariable UUID excursaoId,
            @RequestParam("titulo") String titulo,
            @RequestParam("descricao") String descricao,
            @RequestParam("dataExcursao") String dataExcursao,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        try {
            Optional<Excursao> optionalExcursao = excursaoRepository.findById(excursaoId);
            if (optionalExcursao.isEmpty()) {
                return ResponseEntity.badRequest().body("Excursão não encontrada");
            }

            Excursao excursao = optionalExcursao.get();

            // Atualiza campos básicos
            excursao.setTitulo(titulo);
            excursao.setDescricao(descricao);
            excursao.setDataExcursao(new Date(Long.parseLong(dataExcursao)));

            if (file != null && !file.isEmpty()) {
                // Verificações do tipo e tamanho do arquivo
                if (file.getSize() > 10 * 1024 * 1024) {
                    return ResponseEntity.badRequest().body("Arquivo excede 10MB.");
                }

                String contentType = file.getContentType();
                if (!List.of("image/jpeg", "image/png", "image/webp").contains(contentType)) {
                    return ResponseEntity.badRequest().body("Tipo de imagem não suportado.");
                }

                // Apagar imagem antiga, se houver
                if (excursao.getImgUrl() != null) {
                    String nomeAntigo = excursao.getImgUrl().replace(urlStorage, "");
                    Path caminhoAntigo = Paths.get(path, nomeAntigo);
                    Files.deleteIfExists(caminhoAntigo);
                }

                // Salvar nova imagem
                String extensao = "";
                String originalFilename = file.getOriginalFilename();
                if (originalFilename != null && originalFilename.contains(".")) {
                    extensao = originalFilename.substring(originalFilename.lastIndexOf("."));
                }

                String nomeNovo = UUID.randomUUID().toString() + extensao;
                Path caminhoNovo = Paths.get(path, nomeNovo);
                Files.copy(file.getInputStream(), caminhoNovo, StandardCopyOption.REPLACE_EXISTING);

                // Atualiza URL
                excursao.setImgUrl(urlStorage + nomeNovo);
            }

            excursaoRepository.save(excursao);
            return ResponseEntity.ok().body("Excursão alterada com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao atualizar excursão: " + e.getMessage());
        }
    }


    @DeleteMapping("/{excursaoId}")
    public ResponseEntity<?> deleteExcursao(@PathVariable UUID excursaoId) {
        try {
            this.excursaoService.deleteExcursao(excursaoId);
            return ResponseEntity.ok().body("Excursão excluído com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }

    }

    @GetMapping("/upcoming")
    public ResponseEntity<?> getAllExcursaoUpcoming(@RequestParam Long date) {
        try {
            List<Excursao> excursoes = this.excursaoRepository.findByDataExcursaoAfter(new Date(date));
            if (excursoes.isEmpty()) {
                return ResponseEntity.noContent().build(); // Retorna 204 se não houver excursões
            }
            return ResponseEntity.ok(excursoes);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar excursões: " + e.getMessage());
        }
    }
}
