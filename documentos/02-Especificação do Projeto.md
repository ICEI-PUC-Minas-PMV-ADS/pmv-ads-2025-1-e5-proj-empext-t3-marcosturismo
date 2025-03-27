# Especificações do Projeto


## Usuários
| Tipo de Usuário   | Descrição | Responsabilidades |
|------------------|-----------|------------------|
| Administrador | Gerencia a aplicação e os usuários | Gerenciar usuários, configurar o sistema, acessar informações gerais, aprovar orçamentos. |
| Colaborador/Motorista | Responsável pelas operações logísticas e transporte dos clientes. | Organizar eventos, facilitar o contato com os clientes, acessar dados veículos, realizar os trajetos conforme programado e realizar o check list dos automóveis. |
| Cliente | Usuário final que contrata os serviços de turismo. | Consultar serviços, solicitar orçamentos, visualizar fotos e vídeos, enviar feedback. |

## Arquitetura e Tecnologias
A solução será desenvolvida utilizando tecnologias modernas para garantir desempenho, escalabilidade e manutenção fácil:

### Backend:
***Java (Spring Boot):*** 
- Proporciona uma estrutura robusta e escalável para desenvolver APIs seguras e eficientes.

***PostgreSQL:***
- Banco de dados relacional escolhido pela confiabilidade.

### Frontend:
***Angular:***
- Framework JavaScript que oferece ferramentas poderosas para criar interfaces de usuário responsivas e dinâmicas.

***HTML/CSS/TypeScript:***
- Conjunto essencial para estruturação, estilização e interatividade das páginas.

***Bootstrap:***
- Framework de design responsivo para garantir uma experiência consistente em dispositivos diferentes.

### Hospedagem:
***AWS (Amazon Web Services):***
- Plataforma escalável e confiável, garantindo alta disponibilidade, desempenho e segurança para a aplicação.

## Project Model Canvas
Segue abaixo o nosso modelo:

![Project Model Canvas](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-1-e5-proj-empext-t3-marcosturismo/blob/main/documentos/img/ProjectModelCanvas.png)


## Requisitos 

### Requisitos Funcionais

|ID     | Título do Requisito | Descrição do Requisito  | Prioridade |
|-------|-------------------- |-------------------------|----|
|RF-001 | Autenticação e Painel de Gestão | O sistema deve permitir que apenas colaboradores e o administrador se autentiquem e acessem o painel de gestão. | ALTA |
|RF-002 | Gerenciar Colaboradores | O sistema deve permitir que apenas o administrador cadastre, edite e exclua colaboradores. | ALTA |
|RF-003 | Gerenciar Viagens | O sistema deve permitir que apenas o administrador crie, edite e exclua viagens. | ALTA |
|RF-004 | Gerenciamento de Frota | O sistema deve permitir que o administrador cadastre, edite e exclua veículos da frota. | ALTA |
|RF-005 | Iniciar Viagem e Checklist | O sistema deve permitir que o colaborador inicie sua viagem somente após a realização do checklist do veículo. | ALTA |
|RF-006 | Finalizar Viagem | O sistema deve permitir que o colaborador finalize a viagem após inserir a quilometragem do veículo. | MÉDIA |
|RF-007 | Serviços | O sistema deve permitir que o colaborador registre um serviço realizado em um veículo. | MÉDIA |
|RF-008 | Gerenciar excursões | O sistema deve permitir que o administrador cadastre, edite e exclua excursões. | MÉDIA |
|RF-009 | Contato | O sistema deve permitir que o usuário entre em contato pelo WhatsApp com o cliente por meio de um redirecionamento de URL. | MÉDIA |
|RF-010 | Validar avaliações | O sistema deve permitir que o administrador valide ou exclui avaliações a serem validadas. | MÉDIA |
|RF-011 | Avaliações | O sistema deve permitir que o usuário visitante deixe sua avaliação de serviço para ser validado. | BAIXA |
|RF-012 | Visualizar Frota | O sistema deve permitir que o usuário visitante veja a lista de frotas da empresa. | BAIXA |
|RF-013 | Visualizar excursões | O sistema deve permitir que o usuário visitante veja as próximas excursões. | BAIXA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001 | Disponibilidade | O sistema deve estar disponível 24 horas por dia, garantindo que os usuários possam acessá-lo a qualquer momento. | ALTA |
|RNF-002 | Controle de Acesso | Apenas usuários autenticados com as permissões adequadas poderão acessar o painel de gestão e executar operações administrativas. | ALTA |
|RNF-003 | Compatibilidade | O sistema deve ser compatível com os principais navegadores e dispositivos móveis. | MÉDIA |
|RNF-004 | Desempenho | O sistema deve processar solicitações de autenticação e carregamento de páginas em até 3 segundos para garantir uma experiência ágil para os usuários. | BAIXA |
 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre letivo, não podendo extrapolar a data 22/06/2025.|
|02| A plataforma deve se restringir às tecnologias básicas utilizando ferramentas de desenvolvimento pré-estabelecidas.|
|03| A equipe não pode subcontratar o desenvolvimento do trabalho. |


## Diagrama de Caso de Uso
![casos-de-uso](https://github.com/user-attachments/assets/15c9a2d9-5dd4-45b9-a940-97a4bdcde5e1)


## Modelo Entidade Relacionamento
![Modelo ER  drawio](https://github.com/user-attachments/assets/6644549a-71ed-4376-b50a-ec42283b513c)

## Projeto da Base de Dados
![modelo-dbpng](https://github.com/user-attachments/assets/e591e3d1-5c22-45db-ba13-6b04f58113fa)



