
# Documentação da API

Esse documento é uma orientação para chamadas a api do sistema Marcos Turismo.

Alguns endpoints públicos **NÃO** são necessários a autenticação.

Dependendo do nível do usuário, poderá retornar informações diferentes.

### Uso
1. Acesse a API em: `codigo-fonte\backend`
2. Inicie a aplicação com Mavem
3. A API estará acessível em http://localhost:8080

## Primera execução
Na primeira execução da API, deve-se fazer uma pequena alteração de segurança em um Enpoint, para criar um usuário para fazer login.

1. Acesse `codigo\backend\api\src\main\java\com\marcosturismo\api\infra\security`
2. Entre em `SecurityConfigurations.java`
3. Faça o que se pede na linha comentada em "Usuários"
4. ![image](https://github.com/user-attachments/assets/ac117c49-253c-4b35-9504-a2c693ae13ea)
5. Vá para o tópico "[Criar usuário](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-1-e5-proj-empext-t3-marcosturismo/blob/main/documentos/api_documentacao.md#endpoint-criar-usu%C3%A1rio)" para adicionar um.

---

## Autenticação

### Endpoint: Login  
```
POST /auth/login
```

**Descrição:**  
Fazer o login no sistema e retorna um token contendo o nível de usuário.

**Autenticação:**  
Não é necessário o AUTH.

**Body:**
```json
{
	"email": "admin@admin.com",
	"senha": "admin@admin.com"
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
