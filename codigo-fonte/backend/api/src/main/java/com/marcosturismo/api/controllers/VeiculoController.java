package com.marcosturismo.api.controllers;

import com.marcosturismo.api.domain.veiculo.*;
import com.marcosturismo.api.repositories.ImagemVeiculoRepository;
import com.marcosturismo.api.repositories.VeiculoRepository;
import com.marcosturismo.api.services.VeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("veiculo")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    @Autowired
    private VeiculoRepository veiculoRepository;

    @Autowired
    private ImagemVeiculoRepository imagemVeiculoRepository;

    @Value("${storage.path}")
    private String path;

    @Value("${storage.urlStorage}")
    private String urlStorage;


    @GetMapping
    public ResponseEntity<?> getAllVeiculos() {
        try {
            List<VeiculoResponseDTO> response = this.veiculoService.getAllVeiculos();
            if (response.isEmpty()) {
                return ResponseEntity.noContent().build(); // Retorna 204 se não houver veículos
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar veículos: " + e.getMessage());
        }
    }


    @GetMapping("/frota")
    public ResponseEntity<?> getAllFrota() {
        try {
            var response = this.veiculoService.getAllFrota();
            if (response.isEmpty()) {
                return ResponseEntity.noContent().build(); // Retorna 204 se não houver veículos
            }
            List<VeiculoFrotaResponseDTO> veiculoFrotaResponseDTOList = response.stream()
                    .map(element -> new VeiculoFrotaResponseDTO(
                            element.getModelo(),
                            element.getAnoModelo(),
                            element.getMarca(),
                            element.getLotacao(),
                            element.getCategoria(),
                            element.getArCondicionado(),
                            element.getWifi(),
                            element.getPoltronaReclinavel(),
                            element.getTv(),
                            element.getGeladeira(),
                            element.getSanitarios(),
                            element.getImagens().stream()
                                    .map(ImagemVeiculo::getImgUrl)
                                    .toList()
                    ))
                    .toList();
            return ResponseEntity.ok(veiculoFrotaResponseDTOList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar veículos: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createVeiculo(@RequestBody @Validated VeiculoDTO data) {
        try {
            if (this.veiculoService.findNumeracao(data.numeracao()).isPresent()) {
                return ResponseEntity.badRequest().body("Existe um veículo cadastrado com essa numeração.");
            }

            if (this.veiculoService.findPlaca(data.placa()).isPresent()) {
                return ResponseEntity.badRequest().body("Existe um veículo cadastrado com essa placa.");
            }

            var response = this.veiculoService.createVeiculo(data);
            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao criar veículo: " + e.getMessage());
        }
    }

    @PostMapping("/upload/{veiculoId}")
    public ResponseEntity<?> uploadImagem(@PathVariable UUID veiculoId, @RequestParam("file") MultipartFile file) {
        try {
            var veiculo = veiculoRepository.findById(veiculoId)
                    .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));

            // Verifica o tamanho (em bytes) — 10MB = 10 * 1024 * 1024
            if (file.getSize() > 10 * 1024 * 1024) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Arquivo excede o tamanho máximo permitido de 10MB.");
            }

            // Verifica extensão (opcional)
            String originalFilename = file.getOriginalFilename();
            String extensao = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extensao = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            String contentType = file.getContentType();
            if (!List.of("image/jpeg", "image/png", "image/webp").contains(contentType)) {
                return ResponseEntity.badRequest().body("Tipo de imagem não suportado.");
            }

            // Gera UUID com extensão
            String nomeArquivo = UUID.randomUUID().toString() + extensao;

            Path caminho = Paths.get(path + nomeArquivo);
            Files.copy(file.getInputStream(), caminho, StandardCopyOption.REPLACE_EXISTING);

            String urlImagem = urlStorage + nomeArquivo;

            var imagem = veiculoService.saveImagemVeiculo(urlImagem, veiculo);

            return ResponseEntity.ok(imagem.getImgUrl());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar imagem.");
        }
    }

    @DeleteMapping("/imagem/{imagemId}")
    public ResponseEntity<?> deleteImagem(@PathVariable UUID imagemId) {
        try {
            var imagem = imagemVeiculoRepository.findById(imagemId)
                    .orElseThrow(() -> new RuntimeException("Imagem não encontrada"));
            String filename = imagem.getImgUrl().substring(imagem.getImgUrl().lastIndexOf("/") + 1);
            String caminhoFisico = path + filename;

            File arquivo = new File(caminhoFisico);
            if (arquivo.exists()) {
                if (!arquivo.delete()) {
                    return ResponseEntity.status(500).body("Erro ao deletar o arquivo físico");
                }
            } else {
                System.out.println("Arquivo físico não encontrado, continuando...");
            }

            veiculoService.deleteImagem(imagemId);
            return ResponseEntity.ok().body("Imagem excluída com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PutMapping("/{veiculoId}")
    public ResponseEntity<?> updateVeiculo(@PathVariable UUID veiculoId, @RequestBody @Validated VeiculoDTO data) {
        try {
            var currentVeiculo = this.veiculoService.findById(veiculoId);
            if (currentVeiculo.isEmpty()) {
                return ResponseEntity.badRequest().body("Veículo não encontrado");
            }
            var numVeiculo = this.veiculoService.findNumeracao(data.numeracao());
            if (numVeiculo.isPresent()) {
                if (numVeiculo.get().getId() != currentVeiculo.get().getId()) {
                    return ResponseEntity.badRequest().body("Existe um veículo cadastrado com essa numeração.");
                }
            }

            var placVeiculo = this.veiculoService.findPlaca(data.placa());
            if (placVeiculo.isPresent()) {
                if (placVeiculo.get().getId() != currentVeiculo.get().getId()) {
                    return ResponseEntity.badRequest().body("Existe um veículo cadastrado com essa placa.");
                }
            }

            var updatedVeiculo = veiculoService.updateVeiculo(data, veiculoId);
            return ResponseEntity.ok(updatedVeiculo);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao editar veículo: " + e.getMessage());
        }
    }

    @DeleteMapping("/{veiculoId}")
    public ResponseEntity<?> deleteVeiculo(@PathVariable UUID veiculoId) {
        try {
            veiculoService.deleteVeiculo(veiculoId);
            return ResponseEntity.ok().body("Veículo excluído com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

}

