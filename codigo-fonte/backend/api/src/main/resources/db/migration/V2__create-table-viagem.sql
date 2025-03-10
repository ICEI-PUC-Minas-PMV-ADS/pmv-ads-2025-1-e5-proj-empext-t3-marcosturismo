CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE viagem(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    endereco_saida VARCHAR(100) NOT NULL,
    endereco_chegada VARCHAR(100) NOT NULL,
    distancia DOUBLE PRECISION NOT NULL,
    veiculo_id UUID,
    FOREIGN KEY (veiculo_id) REFERENCES veiculo(id) ON DELETE RESTRICT
);