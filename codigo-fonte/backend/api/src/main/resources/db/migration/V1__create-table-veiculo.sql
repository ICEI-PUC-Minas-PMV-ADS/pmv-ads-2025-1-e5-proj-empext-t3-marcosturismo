CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE veiculo(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    ano_modelo VARCHAR(9) NOT NULL,
    km_atual INT,
    ar_condicionado BOOLEAN DEFAULT FALSE,
    wifi BOOL DEFAULT FALSE,
    poltrona_reclinavel BOOLEAN DEFAULT FALSE,
    tv BOOL DEFAULT FALSE
);