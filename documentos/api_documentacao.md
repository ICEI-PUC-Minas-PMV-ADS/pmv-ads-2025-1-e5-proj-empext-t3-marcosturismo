
# Documentação da API

Esse documento é uma orientação para chamadas a api do sistema Marcos Turismo.

Alguns endpoints públicos **NÃO** são necessários a autenticação. Eles seram identificados como `(para o site)`

Dependendo do nível do usuário, poderá retornar informações diferentes.

### Uso
1. A API estará acessível em https://api.marcosturismo.com.br/
2. Login do administrador master:
```
E-mail -> administrador@marcosturismo.com.br
Senha -> marcos_turismo@2025_admin
```

## Autenticação

### Endpoint: Login  
```
POST /auth/login
```

**Descrição:**  
Fazer o login no sistema e retorna um token contendo o nível de usuário.

**Autenticação:**  
Não é necessário o AUTH.

**Headers**
```Content-Type: application/json```

**Body:**
```json
{
	"email": "administrador@marcosturismo.com.br",
	"senha": "marcos_turismo@2025_admin"
}
```

**Return:**
Possíveis mensagens:
1. `Email e senha são obrigatórios` -> Caso E-mail ou Senha estajam vazias ou nulas.
2. `Credenciais inválidas` -> Caso senha ou e-mail estão errados.
3. `Erro interno ao processar login` -> Algum erro interno da API.
4. Se der tudo certo:
```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLW1hcmNvcy10dXJpc21vIiwic3ViIjoiYWRtaW5AYWRtaW4uY29tIiwiZXhwIjoxNzQzNzg3OTI1fQ.qfwMgz7deigmBYD1B96on-s16BxqX-rKVCoeEjzv_BI"
}
```

---

## Usuários

### Endpoint: Listar usuários
```
GET /usuario
```

**Descrição:**  
Retorna a lista de usuários. Caso o usuário tem uma CNH vinculada a ele, retornará a CNH. Senão, apenas null

**Autenticação:**  
Necessário o AUTH Bearer Token

**Body:**  
Nenhum

**Return:**
Possíveis mensagens:
1. `Erro ao buscar usuários` -> Algum erro interno da API.
2. Se der tudo certo:
```json
[
	{
		"telefone": null,
		"tipo": "Administrador",
		"nome": "admin",
		"id": "3998be9a-9622-4e19-81f0-4308dde03d21",
		"cnh": null,
		"dataCriacao": "2025-04-04T12:32:03.190224",
		"email": "admin@admin.com",
		"status": "Ativo"
	},
	{
		"telefone": null,
		"tipo": "Motorista",
		"nome": "motor",
		"id": "4e39d784-dfdb-40f0-9156-7d5fd4129b45",
		"cnh": {
			"id": "1338aa4f-9522-44e7-bf0f-20de06ac97ec",
			"nome": "motorista",
			"dataNascimento": "2004-05-27",
			"uf": "MG",
			"municipio": "LUGARZINHO",
			"dataEmissao": "2020-01-01",
			"dataValidade": "2030-01-01",
			"rg": "MG000.333.0",
			"org": "PC",
			"ufEmissor": "PC",
			"cpf": "000.000.000-00",
			"numRegistro": "00000",
			"catHabilitacao": "B",
			"dataPHabilitacao": null,
			"dataCriacao": "2025-04-04T12:57:18.936897"
		},
		"dataCriacao": "2025-04-04T12:52:02.338969",
		"email": "motorista@motorista.com",
		"status": "Ativo"
	}
]
```

### Endpoint: Criar usuário  
```
POST /usuario
```

**Descrição:**  
Criar um novo usuário. Somente o usuário administrador tem permissão para criar um usuário.
A senha por padrão é o e-mail do usuário.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
```json
{
	"email": "admin@admin.com",
	"tipo": "Administrador", // Somente: "Administrador" ou "Motorista"
	"status": "Ativo", // Somente: "Ativo", "Inativo" e "EmServico"
	"nome": "admin",
	"telefone": "(31) 9 0000-0000" // Tipo: VARCHAR(20). Não obrigatório.
}
```

**Return:**
Possíveis mensagens:
1. `Email já cadastrado` -> Caso o e-mail inserido já foi cadastrado em um usuário.
2. `Usuário registrado com sucesso` -> Se deu tudo certo.
3. `Erro ao registrar usuário` -> Algum erro interno da API.

### Endpoint: Editar usuário
```
PUT /usuario/18cfc3e9-4d44-4734-ae6d-b6bbe48b8a68
```

**Descrição:**  
Edita um usuário através do ID dele através da URL. Somente o usuário administrador tem permissão para editar um usuário.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
```json
{
	"email": "admin@admin.com",
	"tipo": "Administrador", // Somente: "Administrador" ou "Motorista"
	"status": "Ativo", // Somente: "Ativo", "Inativo" e "EmServico"
	"nome": "admin",
	"telefone": "(31) 9 0000-0000" // Tipo: VARCHAR(20). Não obrigatório.
}
```

**Return:**
Possíveis mensagens:
1. `Usuário não encontrado` -> Se o ID não pertence a nenhum usuário.
2. `Existe um usuário cadastrado com esse email` -> Caso o e-mail alterado já pertence a um usuário.
3. `Usuário atualizado com sucesso` -> Se deu tudo certo.
4. `Erro ao editar usuário` -> Algum erro interno da API.

### Endpoint: Excluir usuário
```
DELETE /usuario/18cfc3e9-4d44-4734-ae6d-b6bbe48b8a68
```

**Descrição:**  
Exclui um usuário através do ID dele através da URL. Somente o usuário administrador tem permissão para excluir um usuário.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Body:**  
Nenhum

**Return:**
Possíveis mensagens:
1. `Usuário não encontrado` -> Se o ID não pertence a nenhum usuário.
2. `Usuário excluído com sucesso` -> Se deu tudo certo.
3. `(erro)` -> Erro interno da API.

----

## CNH (Vinculada ao Usuário)

A listagem da CNH ocorre ao lista todos os usuários.

### Endpoint: Criar CNH  
```
POST /usuario/cnh/4e39d784-dfdb-40f0-9156-7d5fd4129b45
```

**Descrição:**  
Registra uma nova CNH a um Usuário. Somente o usuário administrador tem permissão para registrar uma CNH.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
```json
{
	"nome": "motorista",
	"dataNascimento": "2004-05-27", // Apenas date do tipo: YYYY-MM-DD
 	"uf": "MG", // Não obrigatório
	"municipio": "Cidade 123", // Não obrigatório
	"dataEmissao": "2020-01-01", // Apenas date do tipo: YYYY-MM-DD
	"dataValidade": "2030-01-01", // Apenas date do tipo: YYYY-MM-DD
	"rg": "MG000.333.0",  // Tipo: VARCHAR(20). Não obrigatório
	"org": "PC", // Tipo: VARCHAR(50). Não obrigatório
	"ufEmissor": "PC", // Tipo: VARCHAR(10). Não obrigatório
	"cpf": "000.000.000-00", // Tipo: VARCHAR(20)
	"numRegistro": "00000", // Tipo: VARCHAR(20)
	"catHabilitacao": "B", // Categoria de habilitação. Não obrigatório
	"dataPHabilitacao": "1997-05-20" // Data primeira habilitação. Apenas date do tipo: YYYY-MM-DD
}
```

**Return:**
Possíveis mensagens:
1. `Usuário inválido` -> Se o ID não pertence a nenhum usuário.
2. `Já existe uma CNH registrada nesse CPF` -> Não permite criar mais de uma CNH com mesmo CPF.
2. `Já existe uma CNH com esse número de registro` -> Não permite criar mais de uma CNH com mesmo número de registro.
3. `CNH salva com sucesso` -> Deu tudo certo.
4. `Erro ao salvar CNH` -> Algum erro interno da API.

### Endpoint: Editar CNH
```
PUT /usuario/cnh/18cfc3e9-4d44-4734-ae6d-b6bbe48b8a68
```

**Descrição:**  
Edita uma CNH através do ID do usuário. Somente o usuário administrador tem permissão para editar uma CNH.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
```json
{
	"nome": "motorista",
	"dataNascimento": "2004-05-27", // Apenas date do tipo: YYYY-MM-DD
 	"uf": "MG", // Não obrigatório
	"municipio": "Cidade 123", // Não obrigatório
	"dataEmissao": "2020-01-01", // Apenas date do tipo: YYYY-MM-DD
	"dataValidade": "2030-01-01", // Apenas date do tipo: YYYY-MM-DD
	"rg": "MG000.333.0",  // Tipo: VARCHAR(20). Não obrigatório
	"org": "PC", // Tipo: VARCHAR(50). Não obrigatório
	"ufEmissor": "PC", // Tipo: VARCHAR(10). Não obrigatório
	"cpf": "000.000.000-00", // Tipo: VARCHAR(20)
	"numRegistro": "00000", // Tipo: VARCHAR(20)
	"catHabilitacao": "B", // Categoria de habilitação. Não obrigatório
	"dataPHabilitacao": "1997-05-20" // Data primeira habilitação. Apenas date do tipo: YYYY-MM-DD
}
```

**Return:**
Possíveis mensagens:
1. `Usuário inválido` -> Se o ID não pertence a nenhum usuário.
2. `CNH desse usuário não foi encontrada` -> Se o usuário não tem nenhuma CNH para editar.
3. `Já existe uma CNH registrada nesse CPF` -> Não permite criar mais de uma CNH com mesmo CPF.
4. `Já existe uma CNH com esse número de registro` -> Não permite criar mais de uma CNH com mesmo número de registro.
5. `CNH editada com sucesso` -> Deu tudo certo.
4. `Erro ao editar CNH` -> Algum erro interno da API.

### Endpoint: Excluir CNH
```
DELETE /usuario/cnh/18cfc3e9-4d44-4734-ae6d-b6bbe48b8a68
```

**Descrição:**  
Exclui uma CNH através do ID do usuário. Somente o usuário administrador tem permissão para excluir uma CNH.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Body:**  
Nenhum

**Return:**
Possíveis mensagens:
1. `Usuário não encontrado` -> Se o ID não pertence a nenhum usuário.
2. `CNH não encontrada` -> Se não encontrou nenhuma CNH vinculada ao usuário.
3. `CNH excluída com sucesso` -> Se deu tudo certo.
4. `(erro)` -> Erro interno da API.

---

## Avaliações

### Endpoint: Adicionar avaliação (para o site)
```
POST /avaliacao
```

**Descrição:**  
Insere uma nova avaliação para ser validada pelo o administrador.

**Autenticação:**  
Não é necessário o AUTH.

**Headers**
```Content-Type: application/json```

**Body:**
```json
{
	"autor": "Fulano 2", // Tipo: VARCHAR(255)
	"titulo": "Avaliação válida", // Tipo: VARCHAR(255)
	"descricao": "Muito bom o atendimento",
	"dataPublicacao": 1743953400000, // Timestamp por milisegundos -> https://currentmillis.com/
	"nota": 5 // Tipo: Double Precision, apenas de 0 a 5
}
```

**Return:**
Possíveis mensagens:
1. `Erro ao criar avaliação` -> Algum erro interno da API.
2. Se der tudo certo:
```json
{
	"id": "5e40e250-48d5-4fb6-8186-150202c78a13",
	"autor": "Fulano 2",
	"titulo": "Avaliação válida",
	"descricao": "Muito bom o atendimento",
	"nota": 5,
	"status": "AValidar",
	"dataPublicacao": "2025-04-06T15:30:00.000+00:00",
	"dataCriacao": "2025-04-06T11:58:36.910475"
}
```

### Endpoint: Listar avaliações válidas (para o site) 
```
GET /avaliacao/validas
```

**Descrição:**  
Lista as avaliações validadas pelo o Administrador. Usuários não autenticados podem acessá-lo.

**Autenticação:**  
Não é necessário o AUTH.

**Body:**  
Nenhum

**Return:**
Possíveis mensagens:
1. `Erro ao buscar avaliações` -> Algum erro interno da API.
2. Se der tudo certo:
```json
[
	{
		"id": "bd136497-3eac-4504-9c13-93e6113a5bbf",
		"autor": "Fulano 2",
		"titulo": "Avaliação válida",
		"descricao": "Muito bom o atendimento",
		"nota": 5,
		"status": "Valida",
		"dataPublicacao": "2025-04-06T14:49:02.813+00:00",
		"dataCriacao": "2025-04-06T11:49:02.875853"
	}
]
```

### Endpoint: Listar avaliações válidas e a serem validadas.
```
GET /avaliacao
```

**Descrição:**  
Lista as avaliações válidas e a serem validadas pelo o Administrador. Somente o usuário administrador tem permissão para visualizar.

**Autenticação:**
Necessário o AUTH Bearer Token

**Body:**  
Nenhum

**Return:**
Possíveis mensagens:
1. `Erro ao buscar avaliações` -> Algum erro interno da API.
2. Se der tudo certo:
```json
[
	{
		"id": "b4998024-5626-44ac-b536-2bf4bcbd320f",
		"autor": "Fulano 1",
		"titulo": "TESTE",
		"descricao": "Não gostei",
		"nota": 2,
		"status": "AValidar",
		"dataPublicacao": "2025-04-06T14:35:01.365+00:00",
		"dataCriacao": "2025-04-06T11:35:01.376573"
	},
	{
		"id": "bd136497-3eac-4504-9c13-93e6113a5bbf",
		"autor": "Fulano 2",
		"titulo": "Avaliação válida",
		"descricao": "Muito bom o atendimento",
		"nota": 5,
		"status": "Valida",
		"dataPublicacao": "2025-04-06T14:49:02.813+00:00",
		"dataCriacao": "2025-04-06T11:49:02.875853"
	}
]
```

### Endpoint: Validar uma avaliação não validada.
```
PUT /avaliacao/validar/bd136497-3eac-4504-9c13-93e6113a5bbf
```

**Descrição:**  
Validar uma avaliação para exibi-la no site. Somente o usuário administrador tem permissão para validar.

**Autenticação:**
Necessário o AUTH Bearer Token

**Body:**  
Nenhum

**Return:**
Possíveis mensagens:
1. `Avaliação não encontrada` -> Se o ID não pertence a nenhuma avaliação.
2. `Avaliação validada com sucesso` -> Se deu tudo certo.
3. `Erro ao validar avaliação` -> Erro interno da API.

### Endpoint: Excluir avaliação.
```
DELETE /avaliacao/bd136497-3eac-4504-9c13-93e6113a5bbf
```

**Descrição:**  
Excluir uma avaliação válida ou a ver validada. Somente o usuário administrador tem permissão para excluir.

**Autenticação:**
Necessário o AUTH Bearer Token

**Body:**  
Nenhum

**Return:**
Possíveis mensagens:
1. `Avaliação não encontrada` -> Se o ID não pertence a nenhuma avaliação.
2. `Avaliação excluída com sucesso` -> Se deu tudo certo.
3. `(erro)` -> Erro interno da API.

---

## Excursões

Esse endpoint sofrerá mudanças futuramente, para a adição da funcionalidade imagem

### Endpoint: Adicionar excursão
```
POST /excursao
```

**Descrição:**  
Insere uma nova excursão para ser mostrada em "Excursões" para os visitantes do site. Somente o usuário administrador tem permissão para adicionar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
```json
{
	"titulo": "Viagem em Vegas", // Tipo: VARCHAR(255),
	"descricao": "Noite incrivel",
	"dataExcursao": 1742421600000 // Timestamp por milisegundos -> https://currentmillis.com/
}
```

**Return:**
Possíveis mensagens:
1. `Excursão registrada com sucesso` -> Se deu tudo certo.
2. `Erro ao registrar excursão` -> Erro interno da API.

### Endpoint: Editar excursão
```
PUT /excursao/1132da95-18cf-4ef9-ad5f-3558045ba954
```

**Descrição:**  
Edita uma excursão já existente. Somente o usuário administrador tem permissão para editar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
```json
{
	"titulo": "Viagem em Vegas", // Tipo: VARCHAR(255),
	"descricao": "Noite incrivel",
	"dataExcursao": 1742421600000 // Timestamp por milisegundos -> https://currentmillis.com/
}
```

**Return:**
Possíveis mensagens:
1. `Excursão não encontrada` -> Se o ID não pertence a nenhuma excursão.
2. `Excursão alterada com sucesso` -> Se deu tudo certo.
3. `Erro ao registrar excursão` -> Erro interno da API.

### Endpoint: Deletar excursão
```
DELETE /excursao/1132da95-18cf-4ef9-ad5f-3558045ba954
```

**Descrição:**  
Exclui uma excursão existente. Somente o usuário administrador tem permissão para excluir.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Body:**  
Nenhuma

**Return:**
Possíveis mensagens:
1. `Excursão não encontrada` -> Se o ID não pertence a nenhuma excursão.
2. `Excursão excluído com sucesso` -> Se deu tudo certo.
3. `(erro)` -> Erro interno da API.

### Endpoint: Listar excursões a partir de um timestamp (para o site) 
```
GET /excursao/upcoming?date=1742430548303
```

**Descrição:**  
Lista as excursões próximas de acontecer através de um timestamp por milisegundos. Usuários não autenticados podem acessá-lo.

**Autenticação:**  
Não é necessário o AUTH.

**Body:**  
Nenhum

**Return:**
Possíveis mensagens:
1. `Erro ao buscar excursões` -> Algum erro interno da API.
2. Se der tudo certo:
```json
[
	{
		"id": "78725af9-b4ed-432f-abc0-218b913f70e3",
		"titulo": "Viagem pra bahia",
		"descricao": "Uma viagem super legal",
		"imgUrl": null, // Ainda a ser implementado
		"dataExcursao": "2025-06-22T12:23:06.681+00:00",
		"dataCriacao": "2025-04-06T12:33:29.355403"
	}
]
```

### Endpoint: Listar excursões 
```
GET /excursao
```

**Descrição:**  
Lista de todas as excursões. Somente o usuário administrador tem permissão para visualizar.

**Autenticação:**
Necessário o AUTH Bearer Token

**Body:**  
Nenhum

**Return:**
Possíveis mensagens:
1. `Erro ao buscar excursões` -> Algum erro interno da API.
2. Se der tudo certo:
```json
[
	{
		"id": "f3d92864-e1b1-4ce7-937f-7dfbf241bde1",
		"titulo": "viagem em vegas 2",
		"descricao": "noite incrivel 2",
		"imgUrl": null, // Ainda a ser implementado
		"dataExcursao": "2025-03-19T22:00:00.000+00:00",
		"dataCriacao": "2025-04-06T11:34:54.521145"
	},
	{
		"id": "78725af9-b4ed-432f-abc0-218b913f70e3",
		"titulo": "Viagem pra bahia",
		"descricao": "Uma viagem super legal",
		"imgUrl": null, // Ainda a ser implementado
		"dataExcursao": "2025-06-22T12:23:06.681+00:00",
		"dataCriacao": "2025-04-06T12:33:29.355403"
	}
]
```

---

## Cliente

### Endpoint: Adicionar cliente
```
POST /cliente
```

**Descrição:**  
Insere um novo cliente para fazer o registro de suas viagens. Somente o usuário administrador tem permissão para adicionar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
```json
{
	"nome": "Cliente teste", // Tipo: VARCHAR(255)
	"cpfCnpj": "00.000.0000/0000", // Tipo: VARCHAR(20)
	"telefone": "31 00000-0000", // Tipo: VARCHAR(20). Não obrigatório
	"endereco": "Endereço tal" // Não obrigatório
}
```

**Return:**
Possíveis mensagens:
1. `Cliente registrado com sucesso` -> Se deu tudo certo.
2. `CPF/Cnpj já cadastrado` -> Se o CPF/CNPJ já pertence a outro cliente.
3. `Erro ao registrar cliente` -> Erro interno da API.

### Endpoint: Editar cliente
```
PUT /cliente/a8c4afc2-08de-4ad4-a724-80cdb3e81768
```

**Descrição:**  
Atualiza cliente já existente. Somente o usuário administrador tem permissão para editar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
```json
{
	"nome": "Cliente teste", // Tipo: VARCHAR(255)
	"cpfCnpj": "00.000.0000/0000", // Tipo: VARCHAR(20)
	"telefone": "31 00000-0000", // Tipo: VARCHAR(20). Não obrigatório
	"endereco": "Endereço tal" // Não obrigatório
}
```

**Return:**
Possíveis mensagens:
1. `Cliente não encontrado` -> Se o ID não pertence a nenhuma cliente.
2. `CPF/Cnpj já cadastrado` -> Se o CPF/CNPJ já pertence a outro cliente.
3. `Cliente atualizado com sucesso` -> Se deu tudo certo.
4. `Erro ao registrar cliente` -> Erro interno da API.

### Endpoint: Deletar cliente
```
DELETE /cliente/1132da95-18cf-4ef9-ad5f-3558045ba954
```

**Descrição:**  
Exclui um cliente existente. Somente o usuário administrador tem permissão para excluir.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Body:**  
Nenhuma

**Return:**
Possíveis mensagens:
1. `Cliente não encontrado` -> Se o ID não pertence a nenhum cliente.
2. `Cliente excluído com sucesso` -> Se deu tudo certo.
3. `(erro)` -> Erro interno da API.

### Endpoint: Listar clientes
```
GET /cliente
```

**Descrição:**  
Lista os clientes e suas viagens. Somente o usuário administrador tem permissão para visualizar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Body:**  
Nenhum

**Return:**
Possíveis mensagens:
1. `Erro ao buscar clientes` -> Erro interno da API.
2. Se der tudo certo:
```json
[
	{
		"viagem": [], // Lista de viagens. Retorna vazia se não houver nenhuma
		"telefone": "31 00000-0000",
		"endereco": "Endereço tal",
		"nome": "Ze das contas",
		"id": "d3104493-5411-41f4-ba78-3c34927477a8",
		"cpfCnpj": "00.000.0000/0000",
		"dataCriacao": "2025-04-06T13:04:46.620259"
	}
]
```

---

## Veículos

Esse endpoint sofrerá mudanças futuramente, para a adição da funcionalidade imagens.

### Endpoint: Adicionar veículo
```
POST /veiculo
```

**Descrição:**  
Insere um novo veiculo para fazer parte da frota. Somente o usuário administrador tem permissão para adicionar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
```json
{
	"numeracao": "05", // Número único do veículo dentro da empresa
	"modelo": "G8", // Modelo do ônibus
	"marca": "Marcopolo", // Marca do modelo
	"anoModelo": "2023/2024", // Ano fabricação / Ano de lançamento
	"kmAtual": 25385, // Quilometro total do veículo (25.385)
	"situacao": "Ativo", // Somente: "Ativo", "Inativo" e "Manutencao"
	"placa": "HEE-2120", // Placa única do veículo
	"lotacao": 48, // Capacidada atual
	"categoria": "Rodoviario", // Categoria: Rodoviario, Urbano
	"arCondicionado": true,
	"wifi": true,
	"poltronaReclinavel": true,
	"tv": true,
	"geladeira": true,
	"sanitarios": true
}
```

**Return:**
Possíveis mensagens:
1. `Existe um veículo cadastrado com essa numeração` -> Só é possível cadastrar veículos com numeração única.
2. `Existe um veículo cadastrado com essa placa` -> Só é possível cadastrar veículos com placa única.
3. `Erro ao criar veículo` -> Algum erro interno da API.
4. Se der tudo certo:
```json
{
	"id": "0770d5a2-629d-4a36-b871-4ab611d3dd81",
	"numeracao": "05",
	"modelo": "G8",
	"marca": "Marcopolo",
	"anoModelo": "2023/2024",
	"kmAtual": 25385,
	"situacao": "Ativo",
	"placa": "HEE-2120",
	"kmProxTrocaOleo": null,
	"kmProxTrocaPneu": null,
	"lotacao": 48,
	"categoria": "Rodoviario",
	"arCondicionado": true,
	"wifi": true,
	"poltronaReclinavel": true,
	"tv": true,
	"geladeira": true,
	"sanitarios": true,
	"dataCriacao": "2025-04-06T13:28:38.0698",
	"imagens": [] // A ser implementado
}
```

### Endpoint: Editar veículo
```
PUT /veiculo/17048a2f-1765-4ef5-a81b-7a4db4d65d5c
```

**Descrição:**  
Editar veiculo existente que faz parte da frota. Somente o usuário administrador tem permissão para editar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
```json
{
	"numeracao": "05", // Número único do veículo dentro da empresa
	"modelo": "G8", // Modelo do ônibus
	"marca": "Marcopolo", // Marca do modelo
	"anoModelo": "2023/2024", // Ano fabricação / Ano de lançamento
	"kmAtual": 25385, // Quilometro total do veículo (25.385)
	"situacao": "Ativo", // Somente: "Ativo", "Inativo" e "Manutencao"
	"placa": "HEE-2120", // Placa única do veículo
	"lotacao": 48, // Capacidada atual
	"categoria": "Rodoviario", // Categoria: Rodoviario, Urbano
	"arCondicionado": true,
	"wifi": true,
	"poltronaReclinavel": true,
	"tv": true,
	"geladeira": true,
	"sanitarios": true
}
```

**Return:**
Possíveis mensagens:
1. `Existe um veículo cadastrado com essa numeração` -> Só é possível cadastrar veículos com numeração única.
2. `Existe um veículo cadastrado com essa placa` -> Só é possível cadastrar veículos com placa única.
3. `Erro ao editar veículo` -> Algum erro interno da API.
4. `Veículo não encontrado` -> Se o ID não pertence a nenhum veículo.
5. Se der tudo certo:
```json
{
	"id": "0770d5a2-629d-4a36-b871-4ab611d3dd81",
	"numeracao": "05",
	"modelo": "G8",
	"marca": "Marcopolo",
	"anoModelo": "2023/2024",
	"kmAtual": 25385,
	"situacao": "Ativo",
	"placa": "HEE-2120",
	"kmProxTrocaOleo": null,
	"kmProxTrocaPneu": null,
	"lotacao": 48,
	"categoria": "Rodoviario",
	"arCondicionado": true,
	"wifi": true,
	"poltronaReclinavel": true,
	"tv": true,
	"geladeira": true,
	"sanitarios": true,
	"dataCriacao": "2025-04-06T13:28:38.0698",
	"imagens": [] // A ser implementado
}
```

### Endpoint: Listar veiculos
```
GET /veiculo
```

**Descrição:**  
Lista os veículos. Somente o usuário administrador tem permissão para visualizar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Body:**  
Nenhum

**Return:**
Possíveis mensagens:
1. `Erro ao buscar veículos` -> Erro interno da API.
2. Se der tudo certo:
```json
[
	{
		"id": "0770d5a2-629d-4a36-b871-4ab611d3dd81",
		"numeracao": "05",
		"modelo": "G8",
		"marca": "Marcopolo",
		"anoModelo": "2023/2024",
		"kmAtual": 25385,
		"situacao": "Ativo",
		"placa": "HEE-2120",
		"kmProxTrocaOleo": null,
		"kmProxTrocaPneu": null,
		"lotacao": 48,
		"categoria": "Rodoviario",
		"arCondicionado": true,
		"wifi": true,
		"poltronaReclinavel": true,
		"tv": true,
		"geladeira": true,
		"sanitarios": true,
		"dataCriacao": "2025-04-06T13:28:38.0698",
		"imagens": [] // A ser implementado
	}
]
```

### Endpoint: Listar a frota (para o site)
```
GET /veiculo/frota
```

**Descrição:**  
Lista os veículos válidos (Ativo ou Manutenção) da frota com seus opcionais. Usuários não autenticados podem acessá-lo.

**Autenticação:**  
Nenhum

**Body:**  
Nenhum

**Return:**
Possíveis mensagens:
1. `Erro ao buscar veículos` -> Erro interno da API.
2. Se der tudo certo:
```json
[
	{
		"modelo": "G8",
		"anoModelo": "2023/2024",
		"marca": "Marcopolo",
		"lotacao": 48,
		"categoria": "Rodoviario",
		"arCondicionado": true,
		"wifi": true,
		"poltronaReclinavel": true,
		"tv": true,
		"geladeira": true,
		"sanitarios": true
	}
]
```

### Endpoint: Deletar veículo
```
DELETE /veiculo/e93f485a-5e1d-43b8-b807-6122545179ce
```

**Descrição:**  
Exclui um veículo da frota. Somente o usuário administrador tem permissão para excluir.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Body:**  
Nenhuma

**Return:**
Possíveis mensagens:
1. `Veículo não encontrado` -> Se o ID não pertence a nenhum veículo.
2. `Veículo excluído com sucesso` -> Se deu tudo certo.
3. `(erro)` -> Erro interno da API.

## Viagem

### Endpoint: Adicionar viagem
```
POST /viagem
```

**Descrição:**  
Insere uma nova viagem. Somente o usuário administrador tem permissão para adicionar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
```json
{
	"status": "NaoIniciada", // Somente: "Finalizada", "NaoIniciada", "Cancelada", "EmAndamento"
	"distancia": 652, // Tipo: Double. Distância em KM
	"valor": 5.000, // Tipo: Double. Valor total da viagem
	"dataInicio": 1743028200000, // Timestamp por milisegundos -> https://currentmillis.com/
	"dataChegada": 1743071400000, // Timestamp por milisegundos -> https://currentmillis.com/
	"enderecoSaida": "Belo Horizonte",
	"enderecoDestino": "São Paulo",
	"tipoViagem": "Fretamento", // Somente: "Excursao" e "Fretamento"
	"veiculo": "0770d5a2-629d-4a36-b871-4ab611d3dd81", // ID do veículo
	"motorista": "9bb1454f-9fb4-4290-970a-8651f58b37b7", // ID do motorista
	"cliente": "d3104493-5411-41f4-ba78-3c34927477a8" // ID do cliente
}
```

**Return:**
Possíveis mensagens:
1. `Motorista não encontrado` -> Se o ID não pertence a nenhum motorista.
2. `Cliente não encontrado` -> Se o ID não pertence a nenhum cliente.
3. `Veículo não encontrado` -> Se o ID não pertence a nenhum veículo.
4. `Motorista não encontrado` -> Se o ID não pertence a nenhum motorista.
5. `Erro ao registrar viagem` -> Algum erro interno da API.
6. `Viagem registrada com sucesso` -> Se deu tudo certo.

### Endpoint: Editar viagem
```
PUT /viagem/9d7a4c1a-d23d-406e-9d70-3273f82da77d
```

**Descrição:**  
Edita uma nova viagem. Só é possível editar viagens que não foram finalizadas ou canceladas. Somente o usuário administrador tem permissão para adicionar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
```json
{
	"status": "EmAndamento", // Somente: "Finalizada", "NaoIniciada", "Cancelada", "EmAndamento"
	"distancia": 652, // Tipo: Double. Distância em KM
	"valor": 5.000, // Tipo: Double. Valor total da viagem
	"dataInicio": 1743028200000, // Timestamp por milisegundos -> https://currentmillis.com/
	"dataChegada": 1743071400000, // Timestamp por milisegundos -> https://currentmillis.com/
	"enderecoSaida": "Belo Horizonte",
	"enderecoDestino": "São Paulo",
	"tipoViagem": "Fretamento", // Somente: "Excursao" e "Fretamento"
	"veiculo": "0770d5a2-629d-4a36-b871-4ab611d3dd81", // ID do veículo
	"motorista": "9bb1454f-9fb4-4290-970a-8651f58b37b7", // ID do motorista
	"cliente": "d3104493-5411-41f4-ba78-3c34927477a8" // ID do cliente
}
```

**Return:**
Possíveis mensagens:
1. `Motorista não encontrado` -> Se o ID não pertence a nenhum motorista.
2. `Cliente não encontrado` -> Se o ID não pertence a nenhum cliente.
3. `Veículo não encontrado` -> Se o ID não pertence a nenhum veículo.
4. `Não é possível alterar uma viagem que foi finalizada ou cancelada.` -> Se a viagem já foi finalizada ou cancelada.
5. `Viagem não encontrada` -> Se o ID não pertence a nenhuma viagem.
6. `Erro ao registrar viagem` -> Algum erro interno da API.
7. `Viagem atualizada com sucesso` -> Se deu tudo certo.

### Endpoint: Iniciar viagem
```
PUT /viagem/iniciar/9d7a4c1a-d23d-406e-9d70-3273f82da77d
```

**Descrição:**  
Iniciar uma viagem que ainda não foi concluída ou cancelada. Somente o usuário administrador e motorista escalado tem permissão para iniciar a viagem.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Body:**  
Nenhuma

**Return:**
Possíveis mensagens:
1. `Não é possível iniciar essa viagem pois já foi concluída ou cancelada` -> Se a viagem já foi concluída ou cancelada.
2. `Viagem não encontrada` -> Se o ID não pertence a nenhuma viagem.
3. `Usuário não encontrado` -> Se o usuário autor da requisição não existe.
4. `Você não tem permissão para iniciar esta viagem pois não é o motorista` -> Se o usuário autor da requisição é do tipo Motorista e não é o motorista da viagem.
5. `Erro ao registrar viagem` -> Algum erro interno da API.
6. `Viagem foi iniciada com sucesso. Tenha uma boa viagem!` -> Se deu tudo certo.

### Endpoint: Finalizar viagem
```
PUT /viagem/finalizar/9d7a4c1a-d23d-406e-9d70-3273f82da77d?km=100000
```

**Descrição:**  
Finalizar uma viagem que ainda não foi concluída ou cancelada, e atualizar a quilometragem do veículo. Somente o usuário administrador e o motorista escalado tem permissão para finalizar a viagem.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Body:**  
Nenhuma

**Return:**
Possíveis mensagens:
1. `Não é possível iniciar essa viagem pois já foi concluída ou cancelada` -> Se a viagem já foi concluída ou cancelada.
2. `Viagem não encontrada` -> Se o ID não pertence a nenhuma viagem.
3. `Usuário não encontrado` -> Se o usuário autor da requisição não existe.
4. `Você não tem permissão para finalizar esta viagem pois não é o motorista` -> Se o usuário autor da requisição é do tipo Motorista e não é o motorista da viagem.
5. `Erro ao registrar viagem` -> Algum erro interno da API.
6. `Viagem foi finalizada com sucesso. Tenha um bom descanso!` -> Se deu tudo certo.

### Endpoint: Cancelar viagem
```
PUT /viagem/cancelar/9d7a4c1a-d23d-406e-9d70-3273f82da77d
```

**Descrição:**  
Cancela uma viagem que ainda não foi concluída. Somente o usuário administrador tem permissão para cancelar a viagem.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Body:**  
Nenhuma

**Return:**
Possíveis mensagens:
1. `Não é possível cancelar a viagem porque ela já foi finalizada` -> Se a viagem já foi concluída.
2. `Viagem não encontrada` -> Se o ID não pertence a nenhuma viagem.
3. `Erro ao registrar viagem` -> Algum erro interno da API.
4. `Viagem foi cancelada com sucesso` -> Se deu tudo certo.

### Endpoint: Deletar viagem
```
DELETE /viagem/9d7a4c1a-d23d-406e-9d70-3273f82da77d
```

**Descrição:**  
Exclui uma viagem que já foi finalizada ou cancelada. Somente o usuário administrador tem permissão para excluir.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Body:**  
Nenhuma

**Return:**
Possíveis mensagens:
1. `Viagem não encontrada` -> Se o ID não pertence a nenhum veículo.
2. `Não é possível deletar uma viagem que está em andamento ou não inciada. Cancele-a para excluir.` -> Sea viagem ainda não foi concluída ou cancelada.
2. `Viagem excluída com sucesso` -> Se deu tudo certo.
3. `Erro ao registrar viagem` -> Erro interno da API.

## Tipos de serviços

### Endpoint: Adicionar tipo de serviço
```
POST /servico/tipo_servico
```

**Descrição:**  
Insere um novo tipo de serviço. Somente o usuário administrador tem permissão para adicionar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
```json
{
	"descricao": "Troca de pastilha de freio" // Tipo: VARCHAR(255)
}
```

**Return:**
Possíveis mensagens:
1. `Esse tipo de serviço já está cadastrado` -> Se essa descrição já pertence a outro tipo de serviço.
2. `Tipo de serviço registrado com sucesso` -> Se foi inserido com sucesso.
3. `Erro ao registrar tipo de serviço` -> Algum erro interno da API.

### Endpoint: Deletar tipo de serviço
```
DELETE /servico/tipo_servico/22b77d20-22d2-4cec-8458-2d9b628cc495
```

**Descrição:**  
Deleta um tipo de serviço. Só é possível deletar se o tipo de serviço não está registrado em um Serviço. Somente o usuário administrador tem permissão para deletar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
Nenhuma

**Return:**
Possíveis mensagens:
1. `Não é possível excluir este tipo de serviço, pois ele está sendo utilizado em outros registros` -> Se o tipo de serviço está em registrado em um Serviço.
2. `Tipo de serviço excluído com sucesso` -> Se foi deletado com sucesso.
3. `(erro)` -> Algum erro interno da API.

### Endpoint: Listar tipo de serviço
```
GET /servico/tipo_servico
```

**Descrição:**  
Lista os tipos de serviço registrados no sistema. Somente o usuário administrador tem permissão para visualizar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
Nenhuma

**Return:**
Possíveis mensagens:
1. `Erro ao buscar tipo de serviço` -> Algum erro interno da API.
2. Se der tudo certo:
```json
[
	{
		"id": "14a1f134-66bd-4719-a290-65246bb35aab", // ID do serviço
		"descricao": "Abastecimento", // Descrição do tipo de serviço
		"dataCriacao": "2025-04-27T15:08:21.034094" // Timestamp da data de criação
	},
	{
		"id": "7ceeac45-9275-4da9-9df9-fb078985fb53",
		"descricao": "Troca de óleo",
		"dataCriacao": "2025-04-27T15:08:21.034094"
	},
	{
		"id": "d0161509-ed21-4034-98f4-721d4778be1e",
		"descricao": "Troca de pneus",
		"dataCriacao": "2025-04-27T15:08:21.034094"
	}
]
```

## Serviço

### Endpoint: Adicionar serviço
```
POST /servico
```

**Descrição:**  
Insere um novo serviço com o ID do veículo e tipos de serviçoes. Somente o usuário administrador tem permissão para adicionar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
```json
{
	"dataServico": "2025-04-29", // Data do serviço
	"kmVeiculo": 200000, // KM do serviço atual
	"kmProxTrocaOleo": 205000, // KM da próxima troca de óleo
	"kmProxTrocaPneu": 210000, // KM da próxima troca de pneu
	"descricao": "Revisão completa do veículo", // Descrição do serviço
	"veiculoId": "7e838f19-c328-4c60-bbf7-657d5f5eb5f8", // ID do veículo
	"servicosRealizados": [ // Lista de serviços realizados
	  {
	    "tipoServicoId": "14a1f134-66bd-4719-a290-65246bb35aab", // ID do tipo de serviço
	    "custo": 1200.0 // Custo deste serviço
	  },
	  {
	    "tipoServicoId": "7ceeac45-9275-4da9-9df9-fb078985fb53", // ID do tipo de serviço/
	    "custo": 200.00 // Custo deste serviço
	  }
	]
}
```

**Return:**
Possíveis mensagens:
1. `Usuário não encontrado` -> Se não encontrou o usuário que está inserindo o serviço (falha de token).
2. `Veículo não encontrado` -> Se não encontrou o veículo.
3. `Tipo de serviço não encontrado` -> Se não encontrou o tipo de serviço.
4. `Serviço registrado com sucesso` -> Se foi inserido com sucesso.
5. `Erro ao registrar serviço` -> Algum erro interno da API.

### Endpoint: Listar serviço
```
GET /servico
```

**Descrição:**  
Lista os serviços registrados no sistema. Somente o usuário administrador tem permissão para visualizar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
Nenhuma

**Return:**
Possíveis mensagens:
1. `Erro ao buscar serviço` -> Algum erro interno da API.
2. Se der tudo certo:
```json
[
	{
		"id": "9c5137a7-85dc-4407-9816-835288def291", // ID do serviço
		"dataServico": "2025-04-29", // Data que o serviço foi realizado
		"kmVeiculo": 200000, // KM atual do veículo
		"descricao": "Revisão completa do veículo", // Descrição do serviço
		"dataCriacao": "2025-04-29T23:10:09.250517", // Data que foi inserido esse serviço
		"veiculo": { // Objeto veículo com suas informações
			"id": "7e838f19-c328-4c60-bbf7-657d5f5eb5f8",
			"numeracao": "1002",
			"modelo": "Paradiso 1200 G7",
			"marca": "Marcopolo",
			"anoModelo": "2013/2013",
			"kmAtual": 200000,
			"situacao": "Ativo",
			"kmProxTrocaOleo": 205000,
			"kmProxTrocaPneu": 210000
		},
		"responsavel": { // Responsável que inseriu o serviço
			"id": "5d7208ef-6a27-4904-9a82-23b1b120ef38",
			"status": "Ativo",
			"nome": "Marcos Turismo",
			"tipo": "Administrador",
			"dataCriacao": "2025-04-27T15:08:21.034094"
		},
		"custoTotal": 1400, // Soma de tipo de serviços
		"servicosRealizados": [ // Os tipos de serviços realizados
			{
				"id": "5a3ebdf5-88fb-4526-9b61-7c15d29765ba", // Id da relação
				"tipoServico": { // O tipo de serviço em si
					"id": "14a1f134-66bd-4719-a290-65246bb35aab",
					"descricao": "Abastecimento",
					"dataCriacao": "2025-04-27T15:08:21.034094"
				},
				"custo": 1200, // Custo do tipo de serviço
				"dataCriacao": "2025-04-29T23:10:09.266934"
			},
			{
				"id": "68478ce3-4c1a-4129-8beb-ec089adc45e5", 
				"tipoServico": {
					"id": "7ceeac45-9275-4da9-9df9-fb078985fb53",
					"descricao": "Troca de óleo",
					"dataCriacao": "2025-04-27T15:08:21.034094"
				},
				"custo": 200,
				"dataCriacao": "2025-04-29T23:10:09.273055"
			}
		]
	}
]
```

### Endpoint: Deletar serviço
```
DELETE /servico/f82bd27b-d24f-4152-8bbd-3c3216ccab54
```

**Descrição:**  
Deleta um serviço. Somente o usuário administrador tem permissão para deletar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
Nenhuma

**Return:**
Possíveis mensagens:
1. `Serviço excluído com sucesso` -> Se foi deletado com sucesso.
2. `(erro)` -> Algum erro interno da API.

## Dashboard

### Endpoint: Listar gastos de manutenção nos últimos 6 meses
```
GET /dashboard/gastos-manutencao
```

**Descrição:**  
Lista os gastos de manutenção nos últimos 6 meses. Somente o usuário administrador tem permissão para visualizar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
Nenhuma

**Return:**
Possíveis mensagens:
1. Se der tudo certo:
```json
{
	"12-2024": 0,
	"01-2025": 0,
	"02-2025": 0,
	"03-2025": 0,
	"04-2025": 1400,
	"05-2025": 0
}
```
2. Caso der erro, irá retornar a contagem como 0.

### Endpoint: Listar gastos de manutenção por tipo de serviço
```
GET /dashboard/gastos-manutencao/f91871bd-3965-4688-89a9-b962bf56d071
```

**Descrição:**  
Lista os gastos de manutenção nos últimos 6 meses por tipo de serviço. Somente o usuário administrador tem permissão para visualizar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
Nenhuma

**Return:**
Possíveis mensagens:
1. Se der tudo certo:
```json
{
	"12-2024": 0,
	"01-2025": 0,
	"02-2025": 0,
	"03-2025": 0,
	"04-2025": 1400,
	"05-2025": 0
}
```
2. Caso der erro, irá retornar a contagem como 0.

### Endpoint: Listar veículos ativos
```
GET /dashboard/veiculos-ativos
```

**Descrição:**  
Lista a quantidade de veículos ativos. Somente o usuário administrador tem permissão para visualizar.

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
Nenhuma

**Return:**
Possíveis mensagens:
1. Se der tudo certo:
```json
3
```
2. Caso der erro, irá retornar 0.

### Endpoint: Listar manutenções pendentes
```
GET /dashboard/manutencoes-pendentes
```

**Descrição:**  
Lista de veículos com manutenções pendentes. Somente o usuário administrador tem permissão para visualizar.
Critérios para o veículo aparecer:

Se falta 3.000 km para a troca de óleo.
ou
Se falta 3.000 km para a troca de pneus.
e
Se veículo for ativo ou está em manutenção.

```sql
SELECT v FROM Veiculo v 
    WHERE 
        (v.kmProxTrocaOleo IS NOT NULL AND v.kmAtual >= v.kmProxTrocaOleo - 3000)
        OR
        (v.kmProxTrocaPneu IS NOT NULL AND v.kmAtual >= v.kmProxTrocaPneu - 3000)
        AND
        v.situacao <> 'Inativo'
```

**Autenticação:**  
Necessário o AUTH Bearer Token

**Headers**
```Content-Type: application/json```

**Body:**
Nenhuma

**Return:**
Possíveis mensagens:
1. Se der tudo certo:
```json
[
	{
		"id": "2e6eecef-ebd7-4e7c-83ca-d422e7d71864", // Id do veículo
		"numeracao": "1000", // Numeração do veículo
		"modelo": "Paradiso G7 1200", // Modelo do veículo
		"marca": "Marcopolo", // Marca do véiculo
		"anoModelo": "2011/2011", // Ano e modelo
		"kmAtual": 203000, // KM atual do veículo
		"situacao": "Ativo", // Situação
		"kmProxTrocaOleo": 205000, // Km da próxima troca de óleo
		"kmProxTrocaPneu": 210000 // Km da próxima troca de pneu
	}
]
```