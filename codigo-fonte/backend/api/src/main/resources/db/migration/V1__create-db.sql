CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tabela Veículo
CREATE TABLE veiculo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    numeracao VARCHAR(255),
    modelo VARCHAR(255),
    marca VARCHAR(255),
    ano_modelo VARCHAR(50),
    km_atual INTEGER,
    situacao VARCHAR(50) CHECK (situacao IN ('Ativo', 'Inativo', 'Manutencao')),
    placa VARCHAR(20) UNIQUE,
    km_prox_troca_oleo INTEGER,
    km_prox_troca_pneu INTEGER,
    lotacao INTEGER,
    categoria VARCHAR(255),
    ar_condicionado BOOLEAN,
    wifi BOOLEAN,
    poltrona_reclinavel BOOLEAN,
    tv BOOLEAN,
    geladeira BOOLEAN,
    sanitarios BOOLEAN,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Imagem Veículo
CREATE TABLE imagem_veiculo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    img_url VARCHAR(500) NOT NULL,
    veiculo_id UUID NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (veiculo_id) REFERENCES veiculo(id) ON DELETE CASCADE
);

-- Tabela Serviço
CREATE TABLE servico (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data_servico DATE NOT NULL,
    km_veiculo INTEGER,
    descricao TEXT,
    veiculo_id UUID NOT NULL,
    responsavel_id UUID NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (veiculo_id) REFERENCES veiculo(id) ON DELETE CASCADE
);

-- Tabela Tipo Serviço
CREATE TABLE tipo_servico (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    descricao VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Serviço Realizado
CREATE TABLE servico_realizado (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    servico_id UUID NOT NULL,
    tipos_servicos_id UUID NOT NULL,
    custo DOUBLE PRECISION,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (servico_id) REFERENCES servico(id) ON DELETE CASCADE,
    FOREIGN KEY (tipos_servicos_id) REFERENCES tipo_servico(id) ON DELETE RESTRICT
);

-- Tabela Cliente
CREATE TABLE cliente (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    cpf_cnpj VARCHAR(20) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Usuário
CREATE TABLE usuario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    status VARCHAR(50) CHECK (status IN ('Ativo', 'EmServico', 'Inativo')),
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    tipo VARCHAR(50) CHECK (tipo IN ('Motorista', 'Administrador')),
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Viagem
CREATE TABLE viagem (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    status VARCHAR(50) CHECK (status IN ('Finalizada', 'NaoIniciada', 'Cancelada', 'EmAndamento')),
    distancia DOUBLE PRECISION,
    valor DOUBLE PRECISION,
    data_inicio DATE NOT NULL,
    data_chegada DATE NOT NULL,
    endereco_saida TEXT,
    endereco_destino TEXT,
    tipo_viagem VARCHAR(50) CHECK (tipo_viagem IN ('Excursao', 'Fretamento')),
    veiculo_id UUID NOT NULL,
    motorista_id UUID NOT NULL,
    cliente_id UUID NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (veiculo_id) REFERENCES veiculo(id) ON DELETE CASCADE,
    FOREIGN KEY (motorista_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE
);

-- Tabela Checklist Veículo
CREATE TABLE checklist_veiculo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data_checklist DATE NOT NULL,
    pneus_ok BOOLEAN,
    limpeza_ok BOOLEAN,
    avarias_ok BOOLEAN,
    farois_ok BOOLEAN,
    documento_ok BOOLEAN,
    ocorrencias TEXT,
    viagem_id UUID NOT NULL,
    veiculo_id UUID NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (viagem_id) REFERENCES viagem(id) ON DELETE CASCADE,
    FOREIGN KEY (veiculo_id) REFERENCES veiculo(id) ON DELETE CASCADE
);

-- Tabela Imagem Checklist
CREATE TABLE imagem_checklist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    img_url VARCHAR(500) NOT NULL,
    checklist_veiculo_id UUID NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (checklist_veiculo_id) REFERENCES checklist_veiculo(id) ON DELETE CASCADE
);

-- Tabela CNH
CREATE TABLE cnh (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    uf TEXT,
    municipio TEXT,
    data_emissao DATE NOT NULL,
    data_validade DATE NOT NULL,
    rg VARCHAR(20),
    org VARCHAR(50),
    uf_emissor VARCHAR(10),
    cpf VARCHAR(20) UNIQUE NOT NULL,
    num_registro VARCHAR(50) UNIQUE NOT NULL,
    cat_habilitacao VARCHAR(10),
    data_p_habilitacao DATE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id UUID NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Tabela Avaliação
CREATE TABLE avaliacao (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    autor VARCHAR(255),
    titulo VARCHAR(255),
    descricao TEXT,
    nota DOUBLE PRECISION CHECK (nota BETWEEN 0 AND 10),
    status VARCHAR(50) CHECK (status IN ('Valida', 'AValidar')),
    data_publicacao TIMESTAMP NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Excursão
CREATE TABLE excursao (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR(255),
    descricao TEXT,
    img_url VARCHAR(500),
    data_excursao TIMESTAMP NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insere o administrador master Marcos Turismo
INSERT INTO usuario (id, nome, status, tipo, email, senha)
VALUES ('5d7208ef-6a27-4904-9a82-23b1b120ef38', 'Marcos Turismo', 'Ativo', 'Administrador', 'administrador@marcosturismo.com.br', '$2a$10$HRB01PHbdpmqPhmhbbvjcuXXyqvyCN4PLOhBKlWzHH1yPch9se.v6');

-- Insere tipos de serviço fixo
INSERT INTO tipo_servico (id, descricao)
VALUES ('14a1f134-66bd-4719-a290-65246bb35aab', 'Abastecimento'),
('7ceeac45-9275-4da9-9df9-fb078985fb53', 'Troca de óleo'),
('d0161509-ed21-4034-98f4-721d4778be1e', 'Troca de pneus');