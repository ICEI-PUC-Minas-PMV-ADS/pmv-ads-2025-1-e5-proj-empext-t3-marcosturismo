/*package com.marcosturismo.api.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marcosturismo.api.domain.avaliacao.Avaliacao;
import com.marcosturismo.api.domain.avaliacao.AvaliacaoDTO;
import com.marcosturismo.api.domain.avaliacao.StatusAvaliacao;
import com.marcosturismo.api.services.AvaliacaoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class AvaliacaoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private AvaliacaoService avaliacaoService;

    @Autowired
    private ObjectMapper objectMapper;

    private Avaliacao avaliacao;
    UUID id = UUID.randomUUID();

    @BeforeEach
    void setUp() {
        avaliacao = Avaliacao.builder()
                .id(id)
                .autor("João")
                .titulo("Excelente")
                .descricao("Muito bom o passeio")
                .nota(4.5)
                .status(StatusAvaliacao.AValidar)
                .dataPublicacao(new Date())
                .build();
    }

    @WithMockUser(roles = "ADMIN")
    @Test
    void getAllAvaliacoes_ShouldReturnOk() throws Exception {
        List<Avaliacao> avaliacoes = Collections.singletonList(avaliacao);
        Mockito.when(avaliacaoService.getAllAvaliacoes()).thenReturn(avaliacoes);

        mockMvc.perform(get("/avaliacao"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].autor").value("João"));
    }

    @Test
    void getAllAvaliacoesValidas_ShouldReturnOk() throws Exception {
        Avaliacao avaliacaoValida = Avaliacao.builder()
                .id(UUID.randomUUID())
                .autor("Autor desconhecido")
                .titulo("Título válido")
                .descricao("Descrição válida")
                .nota(5.0)
                .status(StatusAvaliacao.Valida)
                .build();
        ;
        List<Avaliacao> avaliacoesValidas = Collections.singletonList(avaliacaoValida);
        Mockito.when(avaliacaoService.getAllAvaliacoesValidas()).thenReturn(Optional.of(avaliacoesValidas));

        mockMvc.perform(get("/avaliacao/validas"))
                .andExpect(status().isOk());
    }

    @Test
    void createAvaliacao_ShouldReturnCreated() throws Exception {
        AvaliacaoDTO dto = new AvaliacaoDTO("João", "Excelente", "Top demais", 5.0, new Date().getTime());
        Avaliacao nova = new Avaliacao(dto);

        Mockito.when(avaliacaoService.createAvaliacao(any())).thenReturn(nova);

        mockMvc.perform(post("/avaliacao")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated());
    }

    @WithMockUser(roles = "ADMIN")
    @Test
    void deleteAvaliacao_ShouldReturnOk() throws Exception {
        UUID id = UUID.randomUUID();
        doNothing().when(avaliacaoService).deleteAvaliacao(id);

        mockMvc.perform(delete("/avaliacao/" + id))
                .andExpect(status().isNotFound());
    }

    @WithMockUser(roles = "ADMIN")
    @Test
    void validAvaliacao_ShouldReturnOk() throws Exception {
        Mockito.when(avaliacaoService.validAvaliacao(id)).thenReturn(avaliacao);

        mockMvc.perform(put("/avaliacao/validar/" + id))
                .andExpect(status().isOk())
                .andExpect(content().string("Avaliação validada com sucesso."));
    }
}
*/