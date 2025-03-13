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
    sanitarios BOOLEAN
);

-- Tabela Imagem Veículo
CREATE TABLE imagem_veiculo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    img_url VARCHAR(500) NOT NULL,
    veiculo_id UUID NOT NULL,
    FOREIGN KEY (veiculo_id) REFERENCES veiculo(id) ON DELETE CASCADE
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
    veiculo_id UUID NOT NULL,
    FOREIGN KEY (veiculo_id) REFERENCES veiculo(id) ON DELETE CASCADE
);

-- Tabela Imagem Checklist
CREATE TABLE imagem_checklist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    img_url VARCHAR(500) NOT NULL,
    checklist_veiculo_id UUID NOT NULL,
    FOREIGN KEY (checklist_veiculo_id) REFERENCES checklist_veiculo(id) ON DELETE CASCADE
);

-- Tabela Serviço
CREATE TABLE servico (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data_servico DATE NOT NULL,
    km_veiculo INTEGER,
    custo DOUBLE PRECISION,
    descricao TEXT,
    veiculo_id UUID NOT NULL,
    responsavel_id UUID NOT NULL,
    FOREIGN KEY (veiculo_id) REFERENCES veiculo(id) ON DELETE CASCADE
);

-- Tabela Tipo Serviço
CREATE TABLE tipo_servico (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    descricao VARCHAR(255) NOT NULL
);

-- Tabela Serviço Realizado
CREATE TABLE servico_realizado (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    servico_id UUID NOT NULL,
    tipos_servicos_id UUID NOT NULL,
    FOREIGN KEY (servico_id) REFERENCES servico(id) ON DELETE CASCADE,
    FOREIGN KEY (tipos_servicos_id) REFERENCES tipo_servico(id) ON DELETE CASCADE
);

-- Tabela Cliente
CREATE TABLE cliente (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    cpf_cnpj VARCHAR(20) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT
);

-- Tabela Usuário
CREATE TABLE usuario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    status VARCHAR(50) CHECK (status IN ('Ativo', 'EmServico', 'Inativo')),
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    tipo VARCHAR(50) CHECK (tipo IN ('Motorista', 'Administrador')),
    descricao TEXT,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    img_url VARCHAR(500)
);

-- Tabela Viagem
CREATE TABLE viagem (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    status VARCHAR(50) CHECK (status IN ('Finalizada', 'NaoIniciada', 'Cancelada')),
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
    FOREIGN KEY (veiculo_id) REFERENCES veiculo(id) ON DELETE CASCADE,
    FOREIGN KEY (motorista_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE
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
    cat_p_habilitacao DATE,
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
    data_publicacao DATE NOT NULL
);

-- Tabela Excursão
CREATE TABLE excursao (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR(255),
    descricao TEXT,
    img_url VARCHAR(500),
    data_excursao DATE NOT NULL
);
