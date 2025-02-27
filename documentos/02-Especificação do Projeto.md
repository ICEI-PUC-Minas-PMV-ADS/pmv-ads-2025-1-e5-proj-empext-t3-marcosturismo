# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="01-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. 

## Usuários
| Tipo de Usuário   | Descrição | Responsabilidades |
|------------------|-----------|------------------|
| **xxx** | xxxxx | xxxxx |

### Exemplo

| Tipo de Usuário   | Descrição | Responsabilidades |
|------------------|-----------|------------------|
| **Administrador** | Gerencia a aplicação e os usuários. | Gerenciar usuários, configurar o sistema, acessar todos os relatórios. |
| **Funcionário** | Usa a aplicação para suas tarefas principais. | Criar e editar registros, visualizar relatórios. |


## Arquitetura e Tecnologias

Descreva brevemente a arquitetura definida para o projeto e as tecnologias a serem utilizadas. Sugere-se a criação de um diagrama de componentes da solução.

## Project Model Canvas
Segue abaixo o nosso modelo:

![Project Model Canvas](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-1-e5-proj-empext-t3-marcosturismo/blob/main/documentos/img/ProjectModelCanvas.png)


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

Para mais informações, consulte os microfundamentos Fundamentos de Engenharia de Software e Engenharia de Requisitos de Software. 

### Requisitos Funcionais

|ID     | Título do Requisito | Descrição do Requisito  | Prioridade |
|-------|-------------------- |-------------------------|----|
|RF-001 | Site público | O sistema deve permitir que o usuário visitante acesse o site e suas informações. | ALTA |
|RF-002 | Autenticação e Painel de Gestão | O sistema deve permitir que apenas colaboradores e o administrador se autentiquem e acessem o painel de gestão. | ALTA |
|RF-003 | Gerenciar Colaboradores | O sistema deve permitir que apenas o administrador cadastre, edite e exclua colaboradores. | ALTA |
|RF-004 | Gerenciar Viagens | O sistema deve permitir que apenas o administrador crie, edite e exclua viagens. | ALTA |
|RF-005 | Gerenciamento de Frota | O sistema deve permitir que o administrador cadastre, edite e exclua veículos da frota. | ALTA |
|RF-006 | Iniciar Viagem e Checklist | O sistema deve permitir que o colaborador inicie sua viagem somente após a realização do checklist do veículo. | ALTA |
|RF-007 | Finalizar Viagem | O sistema deve permitir que o colaborador finalize a viagem após inserir a quilometragem do veículo. | MÉDIA |
|RF-008 | Serviços | O sistema deve permitir que o colaborador registre um serviço realizado em um veículo. | MÉDIA |
|RF-009 | Gerenciar excursões | O sistema deve permitir que o administrador cadastre, edite e exclua excursões. | MÉDIA |
|RF-010 | Contato | O sistema deve permitir que o usuário entre em contato pelo WhatsApp com o cliente por meio de um redirecionamento de URL. | MÉDIA |
|RF-011 | Validar avaliações | O sistema deve permitir que o administrador valide ou exclui avaliações a serem validadas. | MÉDIA |
|RF-012 | Avaliações | O sistema deve permitir que o usuário visitante deixe sua avaliação de serviço para ser validado. | BAIXA |
|RF-013 | Visualizar Frota | O sistema deve permitir que o usuário visitante veja a lista de frotas da empresa. | BAIXA |
|RF-014 | Visualizar excursões | O sistema deve permitir que o usuário visitante veja as próximas excursões. | BAIXA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001 | Disponibilidade | O sistema deve estar disponível 24 horas por dia, garantindo que os usuários possam acessá-lo a qualquer momento. | ALTA |
|RNF-002 | Controle de Acesso | Apenas usuários autenticados com as permissões adequadas poderão acessar o painel de gestão e executar operações administrativas. | ALTA |
|RNF-003 | Compatibilidade | O sistema deve ser compatível com os principais navegadores e dispositivos móveis. | MÉDIA |
|RNF-004 | Desempenho | O sistema deve processar solicitações de autenticação e carregamento de páginas em até 3 segundos para garantir uma experiência ágil para os usuários. | BAIXA |
 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Caso de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

Para mais informações, consulte o microfundamento Engenharia de Requisitos de Software 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)
![brave_kbDFXHoVEu](https://github.com/user-attachments/assets/cd83a8f1-57df-4ede-b175-51e32f06d9bc)

## Projeto da Base de Dados

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.
![marcos_turismo_db drawio (2)](https://github.com/user-attachments/assets/7cbc4fc0-3c03-42ce-8c6d-c070dfcb9ffd)


Para mais informações, consulte o microfundamento "Modelagem de Dados".

