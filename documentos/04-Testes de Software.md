# Planos de Testes de Software

Nessa etapa, vamos apresentar os casos de teste que utilizamos para verificar e validar a aplicação. Vamos focar em cenários que comprovam o atendimento aos requisitos e também em situações que demonstram como o sistema lida com erros, assegurando sua robustez.

### Tipo de Teste
- **Sucesso**: Verificar se as funcionalidades estão funcionando corretamente.
- **Insucesso**: Verificar se o sistema trata os erros de forma adequada.

#### Caso de Teste de Sucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-001<br>Autenticação e Acesso ao Painel de Gestão
</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td> Verifica se apenas colaboradores e o administrador podem autenticar e acessar o painel de gestão com credenciais válidas.

</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Israel Cunha</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-001:O sistema deve permitir que apenas colaboradores e o administrador se autentiquem e acessem o painel de gestão.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir o sistema.<br>
      2. Inserir o e-mail de um colaborador ou administrador válido.<br>
      3. nserir a senha correspondente.<br>
      4. Clicar no botão "Entrar".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>E-mail:</strong> E-mail cadastrado na base de colaboradores ou administradores.<br>
      - <strong>Senha:</strong> Senha válida correspondente ao e-mail informado.

  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve permitir o login e redirecionar o usuário autenticado para o painel de gestão.</td>
  </tr>
</table>

#### Caso de Teste de Insucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-001<br>Autenticação com Credenciais Inválidas</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Verifica se o sistema impede a autenticação de usuários com credenciais inválidas e exibe mensagens de erro adequadas.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430"> Israel Cunha</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Falha</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-001: O sistema deve permitir que apenas colaboradores e o administrador se autentiquem e acessem o painel de gestão.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1. Abrir o sistema.<br>
      2. Inserir um e-mail inválido (não cadastrado ou com formato incorreto).<br>
      3. Inserir uma senha inválida (errada ou vazia).<br>
      4. Clicar no botão "Entrar".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>E-mail:</strong> E-mail não cadastrado ou em formato inválido.<br>
      - <strong>Senha:</strong>Senha incorreta ou vazia.
  </tr>
     <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> - O sistema deve exibir uma mensagem de erro informando que as credenciais são inválidas.
    <br>
    - O usuário não deve ser autenticado nem redirecionado para o painel de gestão.</td>
  </tr>
</table>

 
# Evidências de Testes de Software

## Sucesso
[A apresentação de evidências de teste é fundamental para comprovar que os testes foram executados conforme o planejado. Essas evidências podem ser imagens ou vídeos que demonstram os resultados obtidos.](https://github.com/user-attachments/assets/6fda9715-99d6-47aa-9417-a1a1a44a2640)

 ## Insucesso

https://github.com/user-attachments/assets/2085135a-a0f6-4710-b604-e9cd8a762255

## Parte 1 - Testes Unitários

<table>
  <tr>
    <th colspan="6" width="1000">CT-001<br>Autenticação com Credenciais Válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve permitir o login e redirecionar o usuário para a página inicial após a autenticação bem-sucedida.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> Israel Cunha</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema autenticou corretamente o usuário e redirecionou para a página inicial sem erros.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/6fda9715-99d6-47aa-9417-a1a1a44a2640"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-001<br>Autenticação com Credenciais Inválidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve exibir uma mensagem de erro e impedir o login quando credenciais inválidas forem inseridas.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Israel Cunha</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema bloqueou corretamente o login com credenciais inválidas e exibiu a mensagem de erro esperada.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/2085135a-a0f6-4710-b604-e9cd8a762255"/></td>
  </tr>
</table>


## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes).

<table>
  <tr>
    <th colspan="6" width="1000">CT-001<br>Autenticação com Credenciais Válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve permitir o login e redirecionar o usuário para a página inicial após a autenticação bem-sucedida.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Israel Cunha </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Davi Reis </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está permitindo o login corretamente e redirecionando o usuário para o painel administrativo, conforme esperado.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/6fda9715-99d6-47aa-9417-a1a1a44a2640"/></td>
  </tr>
 <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/2085135a-a0f6-4710-b604-e9cd8a762255"/></td>
  </tr>
     
</table>

## CT-002 
#### Caso de Teste de Sucesso 
<table>
  <tr>
    <th colspan="2" width="1000">CT-002 Gerenciamento de Colaboradores com Acesso de Administrador</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>
     Verificar se o administrador pode cadastrar, editar e excluir colaboradores com sucesso.     
    </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Maria Lourdes</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002: O sistema deve permitir que apenas o administrador cadastre, edite e exclua colaboradores.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema utilizando credenciais de administrador. <br>
      2.	Navegar até o módulo "Gerenciar Colaboradores". <br>
      3.	Selecionar a opção para cadastrar um novo colaborador. <br>
      4.	Preencher os dados obrigatórios do colaborador e confirmar o cadastro. <br>
      5.	Selecionar um colaborador cadastrado e escolher a opção "Editar". <br>
      6.	Alterar informações relevantes e salvar as alterações. <br>
      7.	Selecionar um colaborador e escolher a opção "Excluir", confirmando a exclusão. <br>
    </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      •	Credenciais: Usuário administrador (e-mail e senha válidos).
      •	Dados para Cadastro/ Edição: Informações válidas e completas do colaborador (nome, e-mail, cargo, etc.).
    </tr>
  
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> 
      •	O sistema permite o cadastro de um novo colaborador e exibe uma mensagem de sucesso.<br>
      •	As alterações realizadas na edição são salvas e refletidas na listagem.<br>
      •	A exclusão do colaborador é efetivada e o registro não aparece mais na listagem.<br>
      •	Todas as ações são permitidas somente quando acessadas com credenciais de administrador.<br>
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/ea23db4a-3491-44b3-aa47-0dae667d4ce6"/></td>
  </tr>
</table>


#### Caso de Teste de Insucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-002 Tentativa de Gerenciamento de Colaboradores com Acesso Não Administrativo</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td> Verificar se o sistema impede que usuários que não sejam administradores realizem operações de cadastro, edição e exclusão de colaboradores.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430"> Maria de Lourdes</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Falha</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-002: O sistema deve permitir que apenas o administrador cadastre, edite e exclua colaboradores.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema utilizando credenciais de um usuário não administrativo (por exemplo, um colaborador comum). <br>
      2.	Tentar navegar até o módulo "Gerenciar Colaboradores" ou acessar suas funcionalidades via URL. <br>
      3.	Verificar se as opções para cadastrar, editar ou excluir colaboradores estão desabilitadas ou ausentes. <br>
      4.	Caso seja possível acessar alguma funcionalidade, tentar realizar uma operação de cadastro, edição ou exclusão. <br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      •	Credenciais: Usuário colaborador (e-mail e senha válidos, sem privilégios administrativos).<br>
      •	Dados para Operação: Quaisquer dados válidos para cadastro/edição (para simular tentativa de uso indevido).<br>

  </tr>
  
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
      •	O sistema deve impedir o acesso às funcionalidades de gerenciamento de colaboradores para usuários não administrativos.<br>
      •	Caso o usuário tente acessar tais funcionalidades, o sistema deve exibir uma mensagem de erro informando "Acesso Negado" ou equivalente.<br>
      •	Nenhuma alteração (cadastro, edição ou exclusão) deve ser realizada no módulo de colaboradores por um usuário não autorizado.<br>
    </td>
  </tr>
</table>

 
# Evidências de Testes de Software

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.

## Parte 1 - Testes Unitários
Cada funcionalidade desenvolvida deve ser testada utilizando os casos de testes (sucesso e insucesso) criados pelo responsável pela funcionalidade. Todos os testes devem ser evidenciados.

<table>
  <tr>
    <th colspan="6" width="1000">CT-002<br>Gerenciamento de Colaboradores com Acesso de Administrador</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">•	O sistema permite o cadastro de um novo colaborador e exibe uma mensagem de sucesso.
      •	As alterações realizadas na edição são salvas e refletidas na listagem.
      •	A exclusão do colaborador é efetivada e o registro não aparece mais na listagem.
      •	Todas as ações são permitidas somente quando acessadas com credenciais de administrador.
</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Maria de Lourdes</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste confirmou que o sistema executa corretamente as operações de cadastro, edição e exclusão quando realizadas por um usuário com privilégios de administrador.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
    <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/ea23db4a-3491-44b3-aa47-0dae667d4ce6"/></td>
  </tr>
  <tr>
    <td ></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-002<br>Tentativa de Gerenciamento de Colaboradores com Acesso Não Administrativo</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">•	O sistema deve impedir o acesso às funcionalidades de gerenciamento de colaboradores para usuários não administrativos.
      •	Caso o usuário tente acessar tais funcionalidades, o sistema deve exibir uma mensagem de erro informando “Acesso Negado” ou equivalente.
      •	Nenhuma alteração (cadastro, edição ou exclusão) deve ser realizada no módulo de colaboradores por um usuário não autorizado.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Maria de Lourdes</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste demonstrou que usuários sem privilégios administrativos não conseguem acessar nem executar operações de gerenciamento de colaboradores, sendo apresentada a mensagem de erro apropriada quando há tentativa de acesso</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
    <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/4c8f1ba8-4e25-4174-8783-f69ee245db98"/></td>
  </tr>
  <tr>
    <td ></td>
  </tr>
</table>


## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes).


## Sucesso
<table>
  <tr>
    <th colspan="6" width="1000">CT-002<br>Gerenciar Colaboradores</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O administrador deve conseguir cadastrar, editar e excluir colaboradores.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Maria de Lourdes </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Leonardo Junio </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O administrador conseguiu gerenciar colaboradores com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td></td>
  </tr>
  
  <th colspan="6" width="1000">CT-002<br>Gerenciar Colaboradores</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Usuários não administradores não devem conseguir gerenciar colaboradores.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Maria de Lourdes </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Leonardo Junio </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema bloqueou corretamente as ações de gerenciamento para usuários não administradores.
</td>
  </tr>
  <tr>
</table>

## CT-003 
#### Caso de Teste de Sucesso 
<table>
  <tr>
    <th colspan="2" width="1000">CT-003 Gerenciamento de Viagens com Acesso de Administrador</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>
      Este caso de teste verifica se o administrador pode cadastrar, editar e excluir colaboradores com sucesso.     
    </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Jefferson Freitas</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-003: O sistema deve permitir que apenas o administrador crie, edite e exclua viagens.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema utilizando credenciais de administrador.<br>
      2.	Navegar até o módulo "Gerenciar Viagens".<br>
      3.	Selecionar a opção para criar uma nova viagem.<br>
      4.	Preencher os dados obrigatórios da viagem (destino, datas, descrição, etc.) e confirmar a criação.<br>
      5.	Selecionar uma viagem cadastrada e escolher a opção "Editar".<br>
      6.	Alterar informações relevantes da viagem e salvar as alterações.<br>
      7.	Selecionar uma viagem e escolher a opção "Excluir", confirmando a exclusão.<br>
    </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      •	Credenciais: Usuário administrador (e-mail e senha válidos).<br>
      •	Dados para Criação/Edição: Informações válidas e completas da viagem (destino, datas, descrição, etc.).<br>
    </tr>
  
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> 
      •	O sistema permite o cadastro de um novo colaborador e exibe uma mensagem de sucesso.<br>
      •	As alterações realizadas na edição são salvas e refletidas na listagem.<br>
      •	A exclusão do colaborador é efetivada e o registro não aparece mais na listagem.<br>
      •	Todas as ações são permitidas somente quando acessadas com credenciais de administrador.<br>
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="INSIRA O VÍDEO AQUI"/></td>
  </tr>
</table>

#### Caso de Teste de Insucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-003 Tentativa de Gerenciamento de Viagens com Acesso Não Administrativo</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td> Este caso de teste verifica se o sistema impede que usuários que não sejam administradores realizem operações de criação, edição e exclusão de viagens.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430"> Jefferson Freitas </td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Falha</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-003: O sistema deve permitir que apenas o administrador crie, edite e exclua viagens.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema utilizando credenciais de um usuário não administrativo (por exemplo, um colaborador comum).<br>
      2.	Tentar navegar até o módulo "Gerenciar Viagens" ou acessar suas funcionalidades via URL.<br>
      3.	Verificar se as opções para criar, editar ou excluir viagens estão desabilitadas ou ausentes.<br>
      4.	Caso seja possível acessar alguma funcionalidade, tentar realizar uma operação de criação, edição ou exclusão.<br>
    </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      •	Credenciais: Usuário colaborador (e-mail e senha válidos, sem privilégios administrativos).<br>
      •	Dados para Operação: Quaisquer dados válidos para simular a tentativa de criação, edição ou exclusão de uma viagem.<br>
    </tr>
  
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
      •	O sistema deve impedir o acesso às funcionalidades de gerenciamento de viagens para usuários não administrativos.<br>
      •	Caso o usuário tente acessar tais funcionalidades, o sistema deve exibir uma mensagem de erro informando "Acesso Negado" ou equivalente.<br>
      •	Nenhuma alteração (criação, edição ou exclusão) deve ser realizada no módulo de viagens por um usuário não autorizado.<br>
    </td>
  </tr>
</table>

 
# Evidências de Testes de Software

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.

## Parte 1 - Testes Unitários
Cada funcionalidade desenvolvida deve ser testada utilizando os casos de testes (sucesso e insucesso) criados pelo responsável pela funcionalidade. Todos os testes devem ser evidenciados.

<table>
  <tr>
    <th colspan="6" width="1000">CT-003<br>Gerenciamento de Viagens com Acesso de Administrador</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">•	O sistema permite que o administrador crie uma nova viagem e exibe uma mensagem de sucesso.
      •	As alterações realizadas na edição de uma viagem são salvas e refletidas na listagem.
      •	A exclusão de uma viagem é efetivada e o registro não aparece mais na listagem.
      •	Todas as ações (criar, editar e excluir) são permitidas apenas quando realizadas com credenciais de administrador.
</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Jefferson Freitas</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste confirmou que o sistema permite a criação, edição e exclusão de viagens quando as operações são realizadas por um usuário com privilégios administrativos, cumprindo o requisito RF-003.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-003<br>Tentativa de Gerenciamento de Viagens com Acesso Não Administrativo</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">•	O sistema deve impedir que usuários sem privilégios de administrador criem, editem ou excluam viagens.
      •	Caso o usuário tente acessar essas funcionalidades, o sistema deve exibir uma mensagem de erro informando “Acesso Negado” ou equivalente.
      •	Nenhuma alteração (criação, edição ou exclusão) deve ser realizada por um usuário não autorizado.
</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Jefferson Freitas</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste demonstrou que o sistema efetivamente bloqueia o acesso às funcionalidades de gerenciamento de viagens para usuários não administrativos, apresentando a mensagem de erro apropriada quando há tentativa de operação.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td></td>
  </tr>
</table>


## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes).

<table>
  <tr>
    <th colspan="6" width="1000">CT-003<br>Gerenciar Viagens</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O administrador deve conseguir cadastrar, editar e excluir viagens</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Jefferson Freitas </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Israel Cunha </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está permitindo o login corretamente e redirecionando o usuário para o painel administrativo.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td></td>
  </tr>

  <th colspan="6" width="1000">CT-003<br>Gerenciar Viagens</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Usuários não administradores não devem conseguir gerenciar viagens.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Jefferson Freitas </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Israel Cunha </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema bloqueou o gerenciamento de viagens para usuários não administradores.
</td>
  </tr>
  <tr>
</table>



## CT-004
#### Caso de Teste de Sucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-004<br>Gerenciamento de Frota com Acesso de Administrador
</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o administrador pode cadastrar, editar e excluir veículos da frota com sucesso.

</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Davi Reis</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-004:O sistema deve permitir que o administrador cadastre, edite e exclua veículos da frota.
    </td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema utilizando credenciais de administrador. <br>
      2.	Navegar até o módulo "Gerenciamento de Frota".<br>
      3.	Selecionar a opção para cadastrar um novo veículo.<br>
      4.	Preencher os dados obrigatórios do veículo (placa, modelo, ano, etc.) e confirmar o cadastro.<br>
      5.	Selecionar um veículo cadastrado e escolher a opção "Editar".<br>
      6.	Alterar informações relevantes do veículo e salvar as alterações.<br>
      7.	Selecionar um veículo e escolher a opção "Excluir", confirmando a exclusão.<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Credenciais:</strong> Colocar e-mail cadastrado na base de colaboradores ou administradores.<br>
      - <strong>Dados para cadastro/edição:</strong> Informações válidas e completas do veículo (placa, modelo, ano, etc.)
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>•	O sistema permite o cadastro de um novo veículo e exibe uma mensagem de sucesso.
•	As alterações realizadas na edição são salvas e refletidas na listagem de veículos.
•	A exclusão do veículo é efetivada e o registro não aparece mais na listagem.
•	Todas as ações são permitidas somente quando realizadas com credenciais de administrador.
</td>
  </tr>
</table>

#### Teste de Insucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-004<br>
    Tentativa de Gerenciamento de Frota com Acesso Não Administrativo</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema impede que usuários que não sejam administradores realizem operações de cadastro, edição e exclusão de veículos da frota.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Davi Reis</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Falha</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-004: O sistema deve permitir que o administrador cadastre, edite e exclua veículos da frota.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema utilizando credenciais de um usuário não administrativo (por exemplo, um colaborador comum). <br>
      2.	Tentar navegar até o módulo "Gerenciamento de Frota" ou acessar suas funcionalidades via URL.<br>
      3.	Verificar se as opções para cadastrar, editar ou excluir veículos estão desabilitadas ou ausentes.<br>
      4.	Caso seja possível acessar alguma funcionalidade, tentar realizar uma operação de cadastro, edição ou exclusão.
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Credencial:</strong> Usuário colaborador (e-mail e senha válidos, sem privilégios administrativos).<br>
      - <strong>Dados para Operação</strong> Quaisquer dados válidos para simular a tentativa de cadastro, edição ou exclusão de um veículo.
  </tr>
     
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> - O sistema deve impedir o acesso às funcionalidades de gerenciamento de frota para usuários não administrativos.
•	Caso o usuário tente acessar tais funcionalidades, o sistema deve exibir uma mensagem de erro informando "Acesso Negado" ou equivalente.
•	Nenhuma alteração (cadastro, edição ou exclusão) deve ser realizada no módulo de frota por um usuário não autorizado.
</td>
  </tr>
</table>


## Parte 1 - Testes Unitários
Cada funcionalidade desenvolvida deve ser testada utilizando os casos de testes (sucesso e insucesso) criados pelo responsável pela funcionalidade. Todos os testes devem ser evidenciados.

<table>
  <tr>
    <th colspan="6" width="1000">CT-004<br>Gerenciamento de Frota com Acesso de Administrador</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">Este teste verifica se o administrador pode gerenciar a frota com sucesso, englobando as operações de cadastro, edição e exclusão de veículos. Para isso, os passos do teste são:
      1.	Acessar o sistema utilizando credenciais de administrador.
      2.	Navegar até o módulo "Gerenciamento de Frota".
      3.	Selecionar a opção para cadastrar um novo veículo.
      4.	Preencher os dados obrigatórios do veículo (modelo, placa, tipo, etc.) e confirmar o cadastro.
      5.	Selecionar um veículo cadastrado e escolher a opção "Editar".
      6.	Alterar informações relevantes e salvar as alterações.
      7.	Selecionar um veículo e escolher a opção "Excluir", confirmando a exclusão.
</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Davi Reis</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste confirmou que o sistema permite corretamente a inserção, alteração e remoção de veículos da frota por meio de um usuário com privilégios administrativos, atendendo ao requisito RF-004.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/3c8b545c-117c-4ea4-88c3-ead61cd5ce05"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-004<br>Tentativa de Gerenciamento de Frota com Acesso Não Administrativo</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">Este teste verifica se o sistema bloqueia o gerenciamento da frota para usuários que não possuem privilégios administrativos. Os passos são:
      1.	Acessar o sistema utilizando credenciais de um usuário não administrativo (por exemplo, um colaborador comum).
      2.	Tentar navegar até o módulo "Gerenciamento de Frota" ou acessar suas funcionalidades diretamente via URL.
      3.	Verificar se as opções para cadastrar, editar ou excluir veículos estão desabilitadas ou ausentes.
      4.	Caso seja possível acessar alguma funcionalidade, tentar executar uma operação de cadastro, edição ou exclusão
</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Davi Reis</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste demonstrou que o sistema efetivamente bloqueia o acesso às funcionalidades de gerenciamento da frota para usuários não administrativos, apresentando a mensagem de erro apropriada quando há tentativa de operação.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
  <img src="https://github.com/user-attachments/assets/d812c181-2ff0-48df-b4ba-69ce1abd1ce6" alt="Imagem" />
</td>

</table>

## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes).

<table>
  <tr>
    <th colspan="6" width="1000">CT-004<br>Gerenxiar Frotas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O administrador deve conseguir cadastrar, editar e excluir veículos da frota.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Davi Reis </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Jefferson Freitas </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">•	O administrador gerenciou veículos da frota com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
       <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/3c8b545c-117c-4ea4-88c3-ead61cd5ce05"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-004<br>Gerenciar Frotas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">•Usuários não administradores não devem conseguir gerenciar a frota.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Davi Reis </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Jefferson Freitas </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema bloqueou corretamente o gerenciamento de frota para usuários não administradores.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
     <td colspan="6" align="center">
  <img src="https://github.com/user-attachments/assets/d812c181-2ff0-48df-b4ba-69ce1abd1ce6" alt="Imagem" />
</td>
</table>


## CT-005
#### Teste de Sucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-005 Início de Viagem Após Realização do Checklist
</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o colaborador consegue iniciar sua viagem somente após concluir o checklist do veículo com sucesso.
</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Jefferson Freitas</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-005:O sistema deve permitir que o colaborador inicie sua viagem somente após a realização do checklist do veículo.
    </td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema com as credenciais do colaborador.<br>
      2.	Navegar até o módulo "Iniciar Viagem".<br>
      3.	Selecionar o veículo que será utilizado na viagem.<br>
      4.	Realizar o checklist do veículo, marcando todos os itens obrigatórios.<br>
      5.	Confirmar a conclusão do checklist.<br>
      6.	Clicar no botão "Iniciar Viagem".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Credenciais:</strong> Usuário colaborador (e-mail e senha válidos).<br>
      - <strong>Dados para cadastro/edição:</strong> Itens do checklist do veículo (ex.: nível de combustível, estado dos pneus, sistema de freios, etc.) devidamente preenchidos e marcados.
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>•	O sistema permite a conclusão do checklist e ativa a opção de iniciar a viagem.<br>
•	Ao clicar em "Iniciar Viagem", o sistema confirma o início da viagem.<br>
•	A viagem é registrada no sistema e os dados do checklist ficam vinculados à viagem iniciada.
  </td>
  </tr>
</table>

#### Teste de Insucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-005<br>
    Tentativa de Iniciar Viagem Sem Realizar Checklist</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema impede o colaborador de iniciar sua viagem sem que o checklist do veículo seja realizado.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Jefferson Freitas</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Falha</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-005: O sistema deve permitir que o colaborador inicie sua viagem somente após a realização do checklist do veículo.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema com as credenciais do colaborador.<br>
      2.	Navegar até o módulo "Iniciar Viagem".<br>
      3.	Selecionar o veículo que será utilizado na viagem.<br>
      4.	Tentar iniciar a viagem sem completar o checklist ou deixando itens obrigatórios em branco.<br>
      5.	Clicar no botão "Iniciar Viagem".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Credencial:</strong> Usuário colaborador (e-mail e senha válidos).<br>
      - <strong>Dados para Operação</strong> Checklist incompleto ou com itens obrigatórios não marcados.
  </tr>
     
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> - O sistema não permite o início da viagem sem que o checklist seja integralmente concluído.
•	Ao tentar iniciar a viagem sem completar o checklist, o sistema exibe uma mensagem de erro informando que o checklist é obrigatório para iniciar a viagem.
•	Nenhuma viagem é registrada até que o checklist seja realizado corretamente.
</td>
  </tr>
</table>


## Parte 1 - Testes Unitários
Cada funcionalidade desenvolvida deve ser testada utilizando os casos de testes (sucesso e insucesso) criados pelo responsável pela funcionalidade. Todos os testes devem ser evidenciados.

<table>
  <tr>
    <th colspan="6" width="1000">CT-005<br>Iniciar Viagem com Checklist Realizado</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">Este teste tem como objetivo validar que um colaborador pode iniciar sua viagem apenas após concluir o checklist do veículo. Para tanto, os passos do teste são:
      1.	Acessar o sistema utilizando credenciais válidas de colaborador.
      2.	Navegar até o módulo de "Iniciar Viagem".
      3.	Realizar o checklist do veículo, marcando todos os itens obrigatórios.
      4.	Confirmar a conclusão do checklist.
      5.	Iniciar a viagem e verificar se o sistema exibe a mensagem de confirmação e atualiza o status da viagem.
</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Jefferson Freitas</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">•	O teste confirmou que, ao completar o checklist do veículo, o sistema permite o início da viagem e apresenta a mensagem de sucesso, atualizando adequadamente o status da viagem
</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="COLOCAR VIDEO"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-005<br>Tentativa de Iniciar Viagem sem Checklist</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">•	Este teste verifica se o sistema bloqueia o início da viagem quando o checklist do veículo não é concluído. Para isso, os passos do teste são:
      1.	Acessar o sistema utilizando credenciais válidas de colaborador.
      2.	Tentar navegar até o módulo "Iniciar Viagem" sem realizar o checklist do veículo.
      3.	Acionar a opção para iniciar a viagem.
      4.	Observar se o sistema exibe a mensagem de erro e impede o início da viagem, mantendo o status inalterado.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Jefferson Freitas</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste demonstrou que, na ausência da realização do checklist, o sistema impede o início da viagem e apresenta a mensagem de erro apropriada, garantindo o cumprimento do requisito</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="COLOCAR VIDEO"/></td>
  </tr>
</table>


## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes).

<table>
  <tr>
    <th colspan="6" width="1000">CT-005<br>Iniciar Viagem e Cheklist</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O colaborador deve conseguir iniciar a viagem apenas após realizar o checklist.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Jefferson Freitas </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Leonardo Junio</td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">•	O sistema permitiu iniciar a viagem somente após o checklist</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="COLOCAR VIDEO"/></td>
  </tr>
</table>
      
<table>
  <tr>
    <th colspan="6" width="1000">CT-005<br>Autenticação com Credenciais Válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">•	Impedir início da viagem sem checklist realizado.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Jefferson Freitas </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Leonardo Junio </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema bloqueou corretamente a tentativa de iniciar a viagem sem o checklist.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="COLOCAR VIDEO"/></td>
  </tr>
</table>

## CT-006 
#### Caso de Teste de Sucesso 
<table>
  <tr>
    <th colspan="2" width="1000">CT-006 Finalização de Viagem com Inserção de Quilometragem</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>
      Este caso de teste verifica se o colaborador consegue finalizar a viagem com sucesso após inserir a quilometragem do veículo.     
    </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Jefferson Freitas</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-006: O sistema deve permitir que o colaborador finalize a viagem após inserir a quilometragem do veículo.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema com as credenciais do colaborador.<br>
      2.	Navegar até o módulo "Finalizar Viagem".<br>
      3.	Selecionar a viagem em andamento.<br>
      4.	Inserir a quilometragem final do veículo.<br>
      5.	Confirmar a finalização da viagem.<br>
    </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      •	Credenciais: Usuário colaborador (e-mail e senha válidos).<br>
      •	Dados para Finalização: Quilometragem final válida e condizente com o percurso realizado.<br>
    </tr>
  
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> 
      •	Credenciais: Usuário colaborador (e-mail e senha válidos).
      •	Dados para Finalização: Quilometragem final válida e condizente com o percurso realizado.
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="INSIRA O VÍDEO AQUI"/></td>
  </tr>
</table>

#### Caso de Teste de Insucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-006 Tentativa de Finalizar Viagem sem Inserir Quilometragem</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td> Tentativa de Finalizar Viagem sem Inserir Quilometragem</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430"> Jefferson Freitas </td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Falha</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-006: O sistema deve permitir que o colaborador finalize a viagem após inserir a quilometragem do veículo.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema com as credenciais do colaborador.<br>
      2.	Navegar até o módulo "Finalizar Viagem".<br>
      3.	Selecionar a viagem em andamento.<br>
      4.	Tentar finalizar a viagem sem inserir a quilometragem ou inserindo um valor inválido.<br>
      5.	Clicar no botão "Finalizar Viagem".<br>
    </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      •	Credenciais: Usuário colaborador (e-mail e senha válidos).<br>
      •	Dados para Finalização: Quilometragem não inserida ou valor inválido (por exemplo, texto ou número fora do esperado).<br>
    </tr>
  
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
      •	O sistema não permite a finalização da viagem sem a inserção de uma quilometragem válida.<br>
      •	Ao tentar finalizar a viagem sem a quilometragem, o sistema exibe uma mensagem de erro informando que a quilometragem é obrigatória.<br>
      •	Nenhuma alteração no status da viagem ocorre até que a quilometragem seja corretamente informada.<br>
    </td>
  </tr>
</table>

 
# Evidências de Testes de Software

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.

## Parte 1 - Testes Unitários
Cada funcionalidade desenvolvida deve ser testada utilizando os casos de testes (sucesso e insucesso) criados pelo responsável pela funcionalidade. Todos os testes devem ser evidenciados.

<table>
  <tr>
    <th colspan="6" width="1000">CT-006<br>Finalização de Viagem com Quilometragem Inserida</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">Este teste verifica se o colaborador consegue finalizar a viagem após inserir a quilometragem do veículo. Os passos para a execução do teste são:
      1.	Acessar o sistema utilizando credenciais válidas de colaborador.
      2.	Navegar até o módulo "Finalizar Viagem".
      3.	Inserir o valor da quilometragem do veículo conforme exigido.
      4.	Confirmar a finalização da viagem.
      5.	Verificar se o sistema atualiza o status da viagem para “Finalizada” e exibe a mensagem de confirmação.
</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Jefferson Freitas</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste confirmou que, ao inserir a quilometragem do veículo, o sistema permite o término da viagem, atualizando o status e apresentando a mensagem de sucesso, conforme esperado.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-006<br>Tentativa de Finalizar Viagem Sem Quilometragem</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">Este teste verifica se o sistema bloqueia a finalização da viagem quando a quilometragem não é inserida. Para isso, os passos do teste são:
      1.	Acessar o sistema utilizando credenciais válidas de colaborador.
      2.	Navegar até o módulo "Finalizar Viagem".
      3.	Tentar finalizar a viagem sem preencher o campo de quilometragem.
      4.	Observar se o sistema exibe a mensagem de erro e impede a finalização da viagem, mantendo o status inalterado.
</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Jefferson Freitas</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste demonstrou que, sem a inserção da quilometragem, o sistema não permite a finalização da viagem, mantendo o status original e exibindo a mensagem de erro apropriada.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td></td>
  </tr>
</table>


## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes).

<table>
  <tr>
    <th colspan="6" width="1000">CT-006<br>Finalizar Viagem</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O colaborador deve conseguir finalizar a viagem após informar a quilometragem.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Jefferson Freitas </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Maria de Lourdes </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5"> O sistema finalizou a viagem corretamente após a quilometragem ser preenchida.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="COLOCAR VIDEO"/></td>
  </tr>
      
</table>
<table>
  <tr>
    <th colspan="6" width="1000">CT-006<br>Finalizar Viagem</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Impedir finalização da viagem sem quilometragem.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Jefferson Freitas </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Maria de Lourdes </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5"> O sistema bloqueou a finalização da viagem sem a informação da quilometragem.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="COLOCAR VIDEO"/></td>
  </tr>
</table>




## CT-007
#### Caso de Teste de Sucesso 
<table>
  <tr>
    <th colspan="2" width="1000">CT-007 Registro de Serviço Realizado no Veículo</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>
      Este caso de teste verifica se o administrador consegue registrar um serviço realizado em um veículo com sucesso.  
    </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Davi Reis </td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-007: O sistema deve permitir que o administrador registre um serviço realizado em um veículo.
    </td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema utilizando as credenciais do administrador.<br>
      2.	Navegar até o módulo "Serviços".<br>
      3.	Selecionar a opção para registrar um novo serviço.<br>
      4.	Preencher os dados obrigatórios do serviço (por exemplo, tipo de serviço, data, descrição, veículo associado, etc.).<br>
      5.	Confirmar o registro do serviço.<br>
    </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      •	Credenciais: Usuário administrador (e-mail e senha válidos).<br>
      •	Dados para Registro: Informações válidas e completas do serviço (tipo de serviço, data e hora, descrição detalhada, identificação do veículo, etc.).<br>
    </tr>
  
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> 
      •	O sistema registra o serviço e exibe uma mensagem de sucesso.<br>
      •	O serviço é armazenado e aparece na listagem de serviços realizados para o veículo.<br>
      •	Os dados do serviço estão corretamente vinculados ao veículo e ao colaborador que realizou o registro.<br>
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/1c731123-22eb-4b92-b38e-ce774beaa448"/></td>
  </tr>
</table>

#### Caso de Teste de Insucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-007 Tentativa de Registro de Serviço com Dados Incompletos ou Inválidos</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td> Este caso de teste verifica se o sistema impede o administrador de registrar um serviço quando os dados obrigatórios não são informados ou estão incorretos.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430"> Davi Reis </td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Falha</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-007: O sistema deve permitir que o administrador registre um serviço realizado em um veículo.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema utilizando as credenciais do administrador.<br>
      2.	Navegar até o módulo "Serviços".<br>
      3.	Selecionar a opção para registrar um novo serviço.<br>
      4.	Tentar registrar o serviço deixando um ou mais campos obrigatórios em branco ou preenchendo com dados inválidos (por exemplo, data em formato incorreto ou descrição vazia).<br>
      5.	Clicar no botão para confirmar o registro do serviço.<br>
    </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      •	Credenciais: Usuário administrador (e-mail e senha válidos).<br>
      •	Dados para Registro: Campos obrigatórios incompletos ou preenchidos incorretamente (exemplo: data não preenchida, descrição ausente ou com caracteres não permitidos).<br>
    </tr>
  
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
      •	O sistema não permite o registro do serviço sem a completa e correta inserção dos dados obrigatórios.<br>
      •	Ao tentar registrar o serviço com dados incompletos ou inválidos, o sistema exibe uma mensagem de erro informando quais campos precisam ser preenchidos corretamente.<br>
      •	Nenhum registro é efetuado até que todos os dados obrigatórios sejam corretamente fornecidos.<br>
    </td>
  </tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/659adddf-a2f6-4fba-a99d-a7ed2418d0ea"/></td>
  </tr>
</table>

 
# Evidências de Testes de Software

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.

## Parte 1 - Testes Unitários
Cada funcionalidade desenvolvida deve ser testada utilizando os casos de testes (sucesso e insucesso) criados pelo responsável pela funcionalidade. Todos os testes devem ser evidenciados.

<table>
  <tr>
    <th colspan="6" width="1000">CT-007<br>Registro de Serviço Realizado em um Veículo com Dados Válidos</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">Este teste verifica se o colaborador pode registrar um serviço realizado em um veículo corretamente. Para executar o teste, os passos são:
      1.	Acessar o sistema utilizando credenciais válidas de colaborador.
      2.	Navegar até o módulo "Serviços".
      3.	Selecionar a opção para registrar um novo serviço.
      4.	Preencher os campos obrigatórios do formulário (por exemplo, identificação do veículo, descrição do serviço, data de realização, e demais informações pertinentes).
      5.	Confirmar o registro do serviço.
      6.	Verificar se o sistema exibe a mensagem de sucesso e se o serviço aparece corretamente listado.
</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Davi Reis</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste confirmou que, ao preencher corretamente os dados, o sistema permite o registro do serviço realizado, exibindo a mensagem de sucesso e atualizando a listagem de serviços corretamente.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/1c731123-22eb-4b92-b38e-ce774beaa448"/></td>
  </tr>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-007<br>Tentativa de Registro de Serviço com Dados Incompletos/Inválidos</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">Este teste verifica se o sistema bloqueia o registro de um serviço realizado em um veículo quando os dados obrigatórios não são informados corretamente. Os passos do teste são:
      1.	Acessar o sistema utilizando credenciais válidas de colaborador.
      2.	Navegar até o módulo "Serviços".
      3.	Selecionar a opção para registrar um novo serviço.
      4.	Preencher o formulário deixando em branco ou com informações inválidas um ou mais campos obrigatórios (por exemplo, omitir a identificação do veículo ou a descrição do serviço).
      5.	Tentar confirmar o registro do serviço.
      6.	Observar se o sistema exibe a mensagem de erro informando quais campos devem ser preenchidos corretamente e verifica se o serviço não é registrado.
</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Davi Reis</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste demonstrou que, na ausência ou incorreção dos dados obrigatórios, o sistema impede o registro do serviço e fornece feedback adequado, mantendo a integridade da informação.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
      <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/1c731123-22eb-4b92-b38e-ce774beaa448"/></td>
  </tr>
  </tr>
</table>


## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes).

<table>
  <tr>
    <th colspan="6" width="1000">CT-007<br>Serviços</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O colaborador deve conseguir registrar um serviço realizado em um veículo.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Davi Reis </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Israel Cunha </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema registrou corretamente o serviço realizado no veículo.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
   <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/1c731123-22eb-4b92-b38e-ce774beaa448"/></td>
  </tr>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-007<br>Serviços</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Impedir o registro de serviço sem preencher os dados obrigatórios.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Davi Reis </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Israel Cunha </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">05/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema bloqueou o registro do serviço sem dados obrigatórios.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
      <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/1c731123-22eb-4b92-b38e-ce774beaa448"/></td>
  </tr>
  </tr>
</table>

## CT-008
#### Teste de Sucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-008<br>Gerenciamento de Excursões com Acesso de Administrador
</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o administrador pode cadastrar, editar e excluir excursões com sucesso.
</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Leonardo Junio</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-008:O sistema deve permitir que o administrador cadastre, edite e exclua excursões.
    </td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema utilizando credenciais de administrador.<br>
      2.	Navegar até o módulo "Gerenciar Excursões".<br>
      3.	Selecionar a opção para cadastrar uma nova excursão.<br>
      4.	Preencher os dados obrigatórios da excursão (por exemplo, destino, data, itinerário, <br>descrição, etc.) e confirmar o cadastro.<br>
      5.	Selecionar uma excursão cadastrada e escolher a opção "Editar".<br>
      6.	Alterar informações relevantes da excursão e salvar as alterações.<br>
      7.	Selecionar uma excursão e escolher a opção "Excluir", confirmando a exclusão.
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Credenciais:</strong> Usuário administrador (e-mail e senha válidos).<br>
      - <strong>Dados para cadastro/edição:</strong>Informações válidas e completas da excursão (destino, data/hora, itinerário, descrição, etc.).
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>• O sistema permite o cadastro de uma nova excursão e exibe uma mensagem de sucesso.<br>
        •	As alterações realizadas na edição são salvas e refletidas na listagem das excursões.<br>
        •	A exclusão da excursão é efetivada e o registro não aparece mais na listagem.<br>
        •	Todas as ações são permitidas somente quando realizadas com credenciais de administrador.
  </td>
  </tr>
</table>

#### Teste de Insucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-008<br>
    Tentativa de Gerenciamento de Excursões com Acesso Não Administrativo</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema impede que usuários que não sejam administradores realizem operações de cadastro, edição e exclusão de excursões.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Leonardo Junio</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Falha</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-008: O sistema deve permitir que o administrador cadastre, edite e exclua excursões.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema utilizando credenciais de um usuário não administrativo (por exemplo, um colaborador comum).<br>
      2.	Tentar navegar até o módulo "Gerenciar Excursões" ou acessar suas funcionalidades via URL.<br>
      3.	Verificar se as opções para cadastrar, editar ou excluir excursões estão desabilitadas ou ausentes.<br>
      4.	Caso seja possível acessar alguma funcionalidade, tentar realizar uma operação de cadastro, edição ou exclusão.
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Credencial:</strong> Usuário colaborador (e-mail e senha válidos, sem privilégios administrativos).<br>
      - <strong>Dados para Operação</strong> Quaisquer dados válidos para simular a tentativa de cadastro, edição ou exclusão de uma excursão.
    </td>
  </tr>
     
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> - O sistema deve impedir o acesso às funcionalidades de gerenciamento de excursões para usuários não administrativos. Ao tentar acessar tais funcionalidades, o sistema deve exibir uma mensagem de erro informando "Acesso Negado" ou equivalente. Nenhuma alteração (cadastro, edição ou exclusão) deve ser realizada no módulo de excursões por um usuário não autorizado.
</td>
  </tr>
</table>


## Parte 1 - Testes Unitários
Cada funcionalidade desenvolvida deve ser testada utilizando os casos de testes (sucesso e insucesso) criados pelo responsável pela funcionalidade. Todos os testes devem ser evidenciados.

<table>
  <tr>
    <th colspan="6" width="1000">CT-008<br>Gerenciamento de Excursões com Acesso de Administrador</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">Este teste valida se o administrador pode gerenciar excursões com sucesso. São executados os seguintes passos:<br>
    1.	Acessar o sistema utilizando credenciais de administrador.<br>
    2.	Navegar até o módulo "Gerenciar Excursões".<br>
    3.	Selecionar a opção para cadastrar uma nova excursão.<br>
    4.	Preencher os dados obrigatórios da excursão (destino, data, itinerário, etc.) e confirmar o cadastro.<br>
    5.	Selecionar uma excursão cadastrada e escolher a opção "Editar".<br>
    6.	Alterar informações relevantes e salvar as alterações.<br>
    7.	Selecionar uma excursão e escolher a opção "Excluir", confirmando a exclusão.
.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Leonardo Junio</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td><strong>Dados de Teste</strong></td>
    <td><strong>Credenciais:</strong> Usuário administrador (e-mail e senha válidos). <br> 
    <strong>Dados para Operação:</strong> Informações válidas e completas da excursão (destino, data, itinerário, detalhes, etc.).</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste confirmou que o sistema possibilita o cadastro, edição e exclusão de excursões quando essas operações são realizadas por um usuário com privilégios administrativos, atendendo ao requisito RF-008.
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/6af0d55e-eb4f-4cb2-bfd6-398032d713d3"></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-008<br>Tentativa de Gerenciamento de Excursões com Acesso Não Administrativo</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">•	O sistema deve impedir que usuários sem privilégios de administrador cadastrem, editem ou excluam excursões.<br>
    •	Caso o usuário tente acessar essas funcionalidades, o sistema deve exibir uma mensagem de erro informando “Acesso Negado” ou equivalente.<br>
    •	Nenhuma operação de cadastro, edição ou exclusão deve ser realizada por um usuário não autorizado.
</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Leonardo Junio</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste demonstrou que o sistema impede o acesso às funcionalidades de gerenciamento de excursões para usuários não autorizados, apresentando a mensagem de erro apropriada e não permitindo alterações no módulo.
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
  <td colspan="6" align="center">
<img src="https://github.com/user-attachments/assets/2724d6b9-d3ed-4872-8011-1407b44827fd" alt="Imagem" />

</table>


## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes).

<table>
  <tr>
    <th colspan="6" width="1000">CT-008<br>Gerenciar Excurções</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O administrador deve conseguir cadastrar, editar e excluir excursões.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Leonardo Junio </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Jefferson Freitas </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">•	: O sistema bloqueou o gerenciamento de excursões para usuários não administradores.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/6af0d55e-eb4f-4cb2-bfd6-398032d713d3"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-008<br>Gerenciar Excurções</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">•	 Usuários não administradores não devem conseguir gerenciar excursões.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Leonardo Junio </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Jefferson Freitas </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema bloqueou o gerenciamento de excursões para usuários não administradores</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center">
 <img src="https://github.com/user-attachments/assets/2724d6b9-d3ed-4872-8011-1407b44827fd" alt="Imagem" />

</table>


## CT-009 
#### Caso de Teste de Sucesso 
<table>
  <tr>
    <th colspan="2" width="1000">CT-009 Redirecionamento para WhatsApp com Dados Válidos</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>
      Este caso de teste verifica se o sistema redireciona o usuário para o WhatsApp com o número do cliente corretamente informado, permitindo o contato via URL.     
    </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Maria de Lourdes</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-009: O sistema deve permitir que o usuário entre em contato pelo WhatsApp com o cliente por meio de um redirecionamento de URL.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema e navegar até o módulo ou opção "Contato".<br>
      2.	Selecionar a opção "Entrar em contato via WhatsApp".<br>
      3.	O sistema realiza o redirecionamento para a URL do WhatsApp, utilizando o número de telefone do cliente configurado.<br>
    </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      •	Número do Cliente: Número de telefone válido e formatado corretamente (ex.: +5511999999999).<br>
      •	URL de Redirecionamento: Formato correto para abrir o WhatsApp (ex.: https://wa.me/5511999999999).<br>
    </tr>
  
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> 
      •	O sistema redireciona o usuário para a URL do WhatsApp, abrindo o aplicativo ou a versão web com a conversa iniciada para o número informado.<br>
      •	Não há erros durante o redirecionamento e o redirecionamento ocorre dentro de um tempo aceitável.<br>
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/c2f20ff8-c8e3-4882-967b-e29395a416aa"/></td>
  </tr>
</table>


#### Caso de Teste de Insucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-009 Tentativa de Redirecionamento para WhatsApp com Dados Inválidos</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema impede o redirecionamento para o WhatsApp quando os dados do cliente estão ausentes ou inválidos.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430"> Maria de Lourdes</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Falha</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-009: O sistema deve permitir que o usuário entre em contato pelo WhatsApp com o cliente por meio de um redirecionamento de URL.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema e navegar até o módulo ou opção "Contato".<br>
      2.	Tentar clicar na opção "Entrar em contato via WhatsApp" sem que o número do cliente seja informado ou utilizando um número em formato incorreto.<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
    •	Número do Cliente:<br>
      o	Caso 1: Número em branco.<br>
      o	Caso 2: Número com formato inválido (ex.: “123abc”).<br>
    </tr>
  
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
      •	O sistema não efetua o redirecionamento para o WhatsApp.<br>
      •	Uma mensagem de erro é exibida informando que o contato não pôde ser estabelecido por falta de um número válido.<br>
      •	O usuário permanece na tela atual, sem ser redirecionado.<br>
    </td>
  </tr>
</table>

 
# Evidências de Testes de Software

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.

## Parte 1 - Testes Unitários
Cada funcionalidade desenvolvida deve ser testada utilizando os casos de testes (sucesso e insucesso) criados pelo responsável pela funcionalidade. Todos os testes devem ser evidenciados.

<table>
  <tr>
    <th colspan="6" width="1000">CT-009<br>Gerenciamento de Colaboradores com Acesso de Administrador</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">•	O sistema permite o cadastro de um novo colaborador e exibe uma mensagem de sucesso.
      •	As alterações realizadas na edição são salvas e refletidas na listagem.
      •	A exclusão do colaborador é efetivada e o registro não aparece mais na listagem.
      •	Todas as ações são permitidas somente quando acessadas com credenciais de administrador.
</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Maria de Lourdes</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste confirmou que o sistema executa corretamente as operações de cadastro, edição e exclusão quando realizadas por um usuário com privilégios de administrador.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
    <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/c2f20ff8-c8e3-4882-967b-e29395a416aa"/></td>
  </tr>
  <tr>
    <td ></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-009<br>Tentativa de Gerenciamento de Colaboradores com Acesso Não Administrativo</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">•	O sistema deve impedir o acesso às funcionalidades de gerenciamento de colaboradores para usuários não administrativos.
      •	Caso o usuário tente acessar tais funcionalidades, o sistema deve exibir uma mensagem de erro informando “Acesso Negado” ou equivalente.
      •	Nenhuma alteração (cadastro, edição ou exclusão) deve ser realizada no módulo de colaboradores por um usuário não autorizado.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Maria de Lourdes</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste demonstrou que usuários sem privilégios administrativos não conseguem acessar nem executar operações de gerenciamento de colaboradores, sendo apresentada a mensagem de erro apropriada quando há tentativa de acesso</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
    <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/c2f20ff8-c8e3-4882-967b-e29395a416aa"/></td>
  </tr>
  <tr>
    <td ></td>
  </tr>
</table>


## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes).

## Sucesso
<table>
  <tr>
    <th colspan="6" width="1000">CT-009<br>Gerenciar Colaboradores</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O administrador deve conseguir cadastrar, editar e excluir colaboradores.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Maria de Lourdes </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Leonardo Junio </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O administrador conseguiu gerenciar colaboradores com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
   <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/c2f20ff8-c8e3-4882-967b-e29395a416aa"/></td>
  </tr>
  </tr>

  <th colspan="6" width="1000">CT-009<br>Gerenciar Colaboradores</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Usuários não administradores não devem conseguir gerenciar colaboradores.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Maria de Lourdes </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Leonardo Junio </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema bloqueou corretamente as ações de gerenciamento para usuários não administradores.
</td>
  </tr>
  <tr>
     <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/c2f20ff8-c8e3-4882-967b-e29395a416aa"/></td>
  </tr>
</table>



## CT-010
#### Teste de Sucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-010<br>Validação de Avaliações pelo Administrador
</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o administrador pode validar avaliações pendentes com sucesso, atualizando o status para "validada".
</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Israel Cunha</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-010:O sistema deve permitir que o administrador valide ou exclua avaliações a serem validadas.
    </td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema utilizando credenciais de administrador.<br>
      2.	Navegar até o módulo "Avaliações Pendentes" ou equivalente.<br>
      3.	Selecionar uma avaliação pendente de validação.<br>
      4.	Escolher a opção "Validar" para aprovar a avaliação.<br>
      5.	Confirmar a ação de validação.<br>
      6.	Verificar se a avaliação muda para o status "validada" e é removida da lista de pendentes.
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Credenciais:</strong> Usuário administrador (e-mail e senha válidos).<br>
      - <strong>Dados para cadastro/edição:</strong>Avaliação existente com status pendente, contendo informações válidas para aprovação.
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>•	O sistema exibe uma mensagem de sucesso confirmando a validação da avaliação.<br>
        • A avaliação é atualizada para o status "validada" e não aparece mais na lista de avaliações pendentes.
  </td>
  </tr>
</table>

#### Teste de Insucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-010<br>
    Tentativa de Validação/Exclusão de Avaliação Sem Privilégios ou com Dados Inválidos.</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema impede a ação de validar ou excluir avaliações quando o usuário não possui privilégios de administrador ou quando a avaliação informada é inválida/inexistente.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Israel Cunha</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Falha</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-010: O sistema deve permitir que o administrador valide ou exclua avaliações a serem validadas.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema utilizando credenciais de um usuário não administrador ou utilizar credenciais de administrador e informar um identificador de avaliação inexistente.<br>
      2.	Tentar acessar o módulo "Avaliações Pendentes" ou realizar uma ação de validação/exclusão.<br>
      3.	Selecionar ou informar uma avaliação inválida/inexistente.<br>
      4.	Tentar confirmar a ação de validação ou exclusão.
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Credencial:</strong>Caso 1: Usuário colaborador (sem privilégios de administração).<br>
      Caso 2: Usuário administrador utilizando um ID de avaliação inválido ou inexistente.<br>
      - <strong>Avaliação para Teste</strong> Dados em branco ou identificador incorreto para a avaliação.
     
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>•	O sistema impede a ação, não validando nem excluindo a avaliação.<br>
      •	É exibida uma mensagem de erro informando que o usuário não possui permissão para realizar a ação ou que a avaliação informada não é válida.<br>
      •	Nenhuma alteração é realizada no status ou na listagem das avaliações.
</td>
  </tr>
</table>


## Parte 1 - Testes Unitários
Cada funcionalidade desenvolvida deve ser testada utilizando os casos de testes (sucesso e insucesso) criados pelo responsável pela funcionalidade. Todos os testes devem ser evidenciados.

<table>
  <tr>
    <th colspan="6" width="1000">CT-010<br>Validação de Avaliações com Acesso de Administrador</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">•	O sistema permite que o administrador visualize as avaliações pendentes de validação.<br>
    •	O administrador pode optar por validar ou excluir cada avaliação.<br>
    •	Ao validar uma avaliação, o sistema exibe uma mensagem de sucesso e a avaliação é marcada como validada.<br>
    •	Ao excluir uma avaliação, o sistema remove ou desmarca a avaliação da lista de pendências.

.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Israel Cunha</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td><strong>Dados de Teste</strong></td>
    <td><strong>Credenciais:</strong> Usuário administrador (e-mail e senha válidos). <br> 
    <strong>Dados para Operação:</strong> Avaliações cadastradas previamente que estão pendentes de validação.</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste confirmou que o sistema permite ao administrador, utilizando as credenciais corretas, validar ou excluir avaliações com sucesso, atualizando o status conforme a ação realizada e exibindo as mensagens apropriadas.
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/f8189120-552a-4013-b36a-23317072efc4"/></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6" width="1000">CT-010<br>Tentativa de Validação/Exclusão de Avaliações por Acesso Não Administrativo</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">•	O sistema deve impedir que usuários sem privilégios de administrador tenham acesso às funcionalidades de validar ou excluir avaliações.<br>
    •	Caso um usuário não autorizado tente acessar essas opções, o sistema deverá exibir uma mensagem de erro informando “Acesso Negado” ou equivalente.<br>
    •	Nenhuma ação de validação ou exclusão deverá ser executada quando o usuário não tiver as permissões necessárias.
</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Israel Cunha</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste demonstrou que o sistema restringe o acesso às funcionalidades de validação e exclusão de avaliações para usuários não autorizados, apresentando a mensagem de erro e bloqueando quaisquer operações indevidas.
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/f8189120-552a-4013-b36a-23317072efc4"/></td>
  </tr>
</table>


## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes).

<table>
  <tr>
    <th colspan="6" width="1000">CT-010<br>Validar Avaliações</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">O administrador deve conseguir validar ou excluir avaliações.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Israel Cunha</td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Davi Reis </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">•O administrador validou e excluiu avaliações com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/f8189120-552a-4013-b36a-23317072efc4"/></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-010<br>Validar Avaliações</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">•	Usuários não administradores não devem conseguir validar ou excluir avaliações.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Israel Cunha </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Davi Reis </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema bloqueou corretamente o acesso para validar ou excluir avaliações.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/f8189120-552a-4013-b36a-23317072efc4"/></td>
  </tr>
</table>


## CT-011
#### Teste de Sucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-011<br>Registro de Avaliação por Visitante
</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se um usuário visitante consegue registrar uma avaliação de serviço para posterior validação.
</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Israel Cunha</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-011:O sistema deve permitir que o usuário visitante deixe sua avaliação de serviço para ser validado.
    </td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema sem realizar login.<br>
      2.	Navegar até a seção "Deixe sua Avaliação" ou equivalente.<br>
      3.	Preencher o formulário de avaliação com as informações obrigatórias (nome, nota, comentário).<br>
      4.	Clicar no botão "Enviar Avaliação".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Nome:</strong> João da Silva<br>
      - <strong>Nota:</strong> 5<br>
      - <strong>Comentário:</strong> "Serviço excelente, recomendo!"
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>•	O sistema deve registrar a avaliação com status "pendente de validação".<br>
      •	O usuário deve receber uma mensagem de sucesso informando que a avaliação foi enviada para análise.
  </td>
  </tr>
</table>

#### Teste de Insucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-011<br>
    Tentativa de Registro de Avaliação com Dados Inválidos ou Incompletos
Descrição: Este caso de teste verifica se o sistema impede o envio de uma avaliação caso o visitante deixe campos obrigatórios vazios ou envie informações inválidas.
</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema impede a ação de validar ou excluir avaliações quando o usuário não possui privilégios de administrador ou quando a avaliação informada é inválida/inexistente.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Israel Cunha</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Falha</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-011: O sistema deve permitir que o usuário visitante deixe sua avaliação de serviço para ser validado.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema sem login.<br>
      2.	Navegar até a seção "Deixe sua Avaliação".<br>
      3.	Preencher parcialmente o formulário (por exemplo, sem nota ou sem comentário).<br>
      4.	Clicar no botão "Enviar Avaliação".
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      - <strong>Nome:</strong>(Preenchido)<br>
      - <strong>Nota:</strong>(Não preenchido)<br>
      - <strong>Comentário</strong>(Preenchido)<br>
      ou <br>
      - <strong>Nota:</strong>(Preenchido)<br>
      - <strong>Nota:</strong>(Preenchido)<br>
      - <strong>Comentário</strong> "Ótimo atendimento."<br>
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>•	O sistema deve impedir o envio da avaliação.<br>
      •	O sistema deve exibir mensagens de erro indicando quais campos obrigatórios não foram preenchidos corretamente.
</td>
  </tr>
</table>


## Parte 1 - Testes Unitários
Cada funcionalidade desenvolvida deve ser testada utilizando os casos de testes (sucesso e insucesso) criados pelo responsável pela funcionalidade. Todos os testes devem ser evidenciados.

<table>
  <tr>
    <th colspan="6" width="1000">CT-011<br>Envio de Avaliação de Serviço por Usuário Visitante</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">Este teste tem como objetivo validar que o visitante consegue enviar uma avaliação de serviço, que será armazenada para posterior validação do administrador. São executados os seguintes passos:<br>
    1.	Acessar o sistema sem necessidade de login (modo visitante).<br>
    2.	Navegar até a seção "Deixe sua Avaliação".<br>
    3.	Preencher o formulário com nome, nota (estrelinhas ou nota numérica), e comentário.<br>
    4.	Confirmar o envio da avaliação.<br>
    5.	Verificar se o sistema exibe a mensagem de sucesso.<br>
    6.	Verificar se a avaliação foi enviada para a lista de avaliações pendentes de validação.
.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Israel Cunha</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td><strong>Dados de Teste</strong></td>
    <td><strong>Usuário:</strong> Visitante (não autenticado). <br> 
    <strong>Dados da Avaliação:</strong> Nome válido, nota válida, comentário válido.</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema permitiu que o visitante preenchesse e enviasse a avaliação corretamente. Após o envio, a mensagem de sucesso foi exibida e a avaliação foi armazenada para validação do administrador, conforme esperado.
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
  <td colspan="6" align="center">
  <img src="https://github.com/user-attachments/assets/acb55a8b-344f-4a36-9cd1-8833f745bda8" alt="Imagem" />
</td>

</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-011<br>Falha no Envio de Avaliação de Serviço por Usuário Visitante</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">•	O sistema deve impedir o envio da avaliação caso o formulário esteja incompleto ou inválido.<br>
    •	O sistema deve exibir mensagens de erro apropriadas para cada campo obrigatório não preenchido ou preenchido incorretamente.<br>
    •	A avaliação não deve ser enviada ao sistema até que todos os campos obrigatórios sejam devidamente preenchidos.

</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Israel Cunha</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>

  <tr>
    <td><strong>Dados de Teste</strong></td>
    <td><strong>Usuário:</strong> Visitante (não autenticado). <br> 
    <strong>Dados da Avaliação:</strong> Nome em branco, nota ausente, comentário vazio.</td>
  </tr>

  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema corretamente impediu o envio da avaliação incompleta, exibindo mensagens de erro para cada campo obrigatório não preenchido ("Nome é obrigatório", "Nota é obrigatória", "Comentário é obrigatório"). Nenhuma avaliação foi enviada para validação.
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
 <td colspan="6" align="center">
  <img src="https://github.com/user-attachments/assets/acb55a8b-344f-4a36-9cd1-8833f745bda8" alt="Imagem" />
</td>

</table>


## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes).

<table>
  <tr>
    <th colspan="6" width="1000">CT-011<br>Validações por Visitante</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">O visitante deve conseguir deixar uma avaliação para ser validada.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Israel Cunha </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Davi Reis </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">•	O visitante enviou a avaliação com sucesso e ficou aguardando validação.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
   <td colspan="6" align="center">
  <img src="https://github.com/user-attachments/assets/acb55a8b-344f-4a36-9cd1-8833f745bda8" alt="Imagem" />
</td>

</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-011<br>Avaliação por visitantes</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">•	O sistema deve impedir envio de avaliação sem preencher os dados obrigatórios.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Israel Cunha </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Davi Reis </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema bloqueou corretamente o envio de avaliações incompletas.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
  <td colspan="6" align="center">
  <img src="https://github.com/user-attachments/assets/acb55a8b-344f-4a36-9cd1-8833f745bda8" alt="Imagem" />
</td>

</table>


## CT-012
#### Caso de Teste de Sucesso 
<table>
  <tr>
    <th colspan="2" width="1000">CT-012 Visualização da Frota por Usuário Visitante</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>
      Este caso de teste verifica se um usuário visitante consegue visualizar corretamente a lista de veículos da frota da empresa.
    </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Davi Reis</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-012: O sistema deve permitir que o usuário visitante veja a lista de frotas da empresa.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema sem realizar login.<br>
      2.	Navegar até a seção "Nossa Frota" ou equivalente.<br>
      3.	Visualizar a lista de veículos exibidos na página.<br>
      4.	Confirmar se as informações dos veículos (modelo, capacidade, fotos, etc.) são exibidas corretamente.<br>
    </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      •	Não aplicável (visualização pública, sem necessidade de dados específicos).<br>
    </tr>
  
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> 
      •	O sistema exibe a lista completa de veículos cadastrados na frota.<br>
      •	As informações de cada veículo estão visíveis e corretas.<br>
      •	A página carrega sem erros ou lentidão.<br>
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/7e0285c2-92e5-4608-8449-96d8e12689cf"/></td>
  </tr>
</table>


#### Caso de Teste de Insucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-012 Tentativa de Visualização da Frota com Erro de Carregamento</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema trata adequadamente uma falha ao carregar a lista de frotas.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Davi Reis</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Falha</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-012: O sistema deve permitir que o usuário visitante veja a lista de frotas da empresa.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema como visitante.<br>
      2.	Navegar até a seção "Nossa Frota".<br>
      3.	Simular falha no carregamento de dados (por exemplo, desconexão de internet ou erro do servidor).<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      •	Simulação de erro no backend ou interrupção da rede.<br>
    </tr>
  
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
      •	O sistema deve exibir uma mensagem de erro amigável (ex.: "Não foi possível carregar a lista de veículos. Tente novamente mais tarde.").<br>
      •	O sistema não deve travar nem exibir páginas em branco.<br>
    </td>
  </tr>
</table>

 
# Evidências de Testes de Software

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.

## Parte 1 - Testes Unitários
Cada funcionalidade desenvolvida deve ser testada utilizando os casos de testes (sucesso e insucesso) criados pelo responsável pela funcionalidade. Todos os testes devem ser evidenciados.

<table>
  <tr>
    <th colspan="6" width="1000">CT-012<br>Gerenciamento de Colaboradores com Acesso de Administrador</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">•	O sistema permite o cadastro de um novo colaborador e exibe uma mensagem de sucesso.
      •	As alterações realizadas na edição são salvas e refletidas na listagem.
      •	A exclusão do colaborador é efetivada e o registro não aparece mais na listagem.
      •	Todas as ações são permitidas somente quando acessadas com credenciais de administrador.
</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Maria de Lourdes</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste confirmou que o sistema executa corretamente as operações de cadastro, edição e exclusão quando realizadas por um usuário com privilégios de administrador.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
    <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/7e0285c2-92e5-4608-8449-96d8e12689cf"/></td>
  </tr>
  <tr>
    <td ></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-012<br>Tentativa de Gerenciamento de Colaboradores com Acesso Não Administrativo</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">•	O sistema deve impedir o acesso às funcionalidades de gerenciamento de colaboradores para usuários não administrativos.
      •	Caso o usuário tente acessar tais funcionalidades, o sistema deve exibir uma mensagem de erro informando “Acesso Negado” ou equivalente.
      •	Nenhuma alteração (cadastro, edição ou exclusão) deve ser realizada no módulo de colaboradores por um usuário não autorizado.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Maria de Lourdes</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste demonstrou que usuários sem privilégios administrativos não conseguem acessar nem executar operações de gerenciamento de colaboradores, sendo apresentada a mensagem de erro apropriada quando há tentativa de acesso</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
    <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/7e0285c2-92e5-4608-8449-96d8e12689cf"/></td>
  </tr>
  <tr>
    <td ></td>
  </tr>
</table>


## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes).

## Sucesso
<table>
  <tr>
    <th colspan="6" width="1000">CT-012<br>Gerenciar Colaboradores</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O administrador deve conseguir cadastrar, editar e excluir colaboradores.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Maria de Lourdes </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Leonardo Junio </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O administrador conseguiu gerenciar colaboradores com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td></td>
  </tr>

  <th colspan="6" width="1000">CT-012<br>Gerenciar Colaboradores</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Usuários não administradores não devem conseguir gerenciar colaboradores.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Maria de Lourdes </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Leonardo Junio </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema bloqueou corretamente as ações de gerenciamento para usuários não administradores.
</td>
  </tr>
  <tr>
</table>


## CT-013 
#### Caso de Teste de Sucesso 
<table>
  <tr>
    <th colspan="2" width="1000">CT-013 Visualização de Excursões por Usuário Visitante</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>
      Este caso de teste verifica se um usuário visitante consegue visualizar corretamente a lista de próximas excursões disponíveis.
    </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Leonardo Junio</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-013: O sistema deve permitir que o usuário visitante veja as próximas excursões.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema sem realizar login.<br>
      2.	Navegar até a seção "Excursões" ou equivalente.<br>
      3.	Visualizar a lista de excursões disponíveis.<br>
      4.	Confirmar se as informações sobre cada excursão (destino, data, horário, valor, etc.) são exibidas corretamente.<br>
    </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      •	Não aplicável (visualização pública, sem necessidade de inserção de dados).<br>
    </tr>
  
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> 
      •	O sistema exibe a lista de excursões cadastradas.<br>
      •	As informações de cada excursão (destino, data, valor, etc.) estão completas e corretas.<br>
      •	A página carrega normalmente e sem erros.<br>
    </td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/19fe4091-1b0e-4788-b5d6-c1d9b16eb9da"/></td>
  </tr>
</table>


#### Caso de Teste de Insucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-013 Tentativa de Visualização de Excursões com Erro de Carregamento</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema trata adequadamente uma falha ao carregar a lista de excursões.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430"> Leonardo Junio</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Falha</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-013: O sistema deve permitir que o usuário visitante veja as próximas excursões.</td>
  </tr>
  <tr>
    <td><strong>Passos</strong></td>
    <td>
      1.	Acessar o sistema como visitante.<br>
      2.	Navegar até a seção "Excursões".<br>
      3.	Simular uma falha no carregamento das excursões (por exemplo, interrupção de internet ou erro no servidor).<br>
      </td>
  </tr>
    <tr>
    <td><strong>Dados de teste</strong></td>
    <td>
      •	Simulação de falha de conexão ou indisponibilidade do banco de dados de excursões.<br>
    </tr>
  
  <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>
      •	O sistema deve exibir uma mensagem amigável de erro (ex.: "Não foi possível carregar as excursões no momento. Tente novamente mais tarde.").<br>
      •	O sistema não deve travar ou apresentar comportamento inesperado.<br>
    </td>
  </tr>
</table>

 
# Evidências de Testes de Software

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.

## Parte 1 - Testes Unitários
Cada funcionalidade desenvolvida deve ser testada utilizando os casos de testes (sucesso e insucesso) criados pelo responsável pela funcionalidade. Todos os testes devem ser evidenciados.

<table>
  <tr>
    <th colspan="6" width="1000">CT-013<br>Gerenciamento de Colaboradores com Acesso de Administrador</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">•	O sistema permite o cadastro de um novo colaborador e exibe uma mensagem de sucesso.
      •	As alterações realizadas na edição são salvas e refletidas na listagem.
      •	A exclusão do colaborador é efetivada e o registro não aparece mais na listagem.
      •	Todas as ações são permitidas somente quando acessadas com credenciais de administrador.
</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Maria de Lourdes</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste confirmou que o sistema executa corretamente as operações de cadastro, edição e exclusão quando realizadas por um usuário com privilégios de administrador.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
    <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/19fe4091-1b0e-4788-b5d6-c1d9b16eb9da"/></td>
  </tr>
  <tr>
    <td ></td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="6" width="1000">CT-013<br>Tentativa de Gerenciamento de Colaboradores com Acesso Não Administrativo</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">•	O sistema deve impedir o acesso às funcionalidades de gerenciamento de colaboradores para usuários não administrativos.
      •	Caso o usuário tente acessar tais funcionalidades, o sistema deve exibir uma mensagem de erro informando “Acesso Negado” ou equivalente.
      •	Nenhuma alteração (cadastro, edição ou exclusão) deve ser realizada no módulo de colaboradores por um usuário não autorizado.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Maria de Lourdes</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O teste demonstrou que usuários sem privilégios administrativos não conseguem acessar nem executar operações de gerenciamento de colaboradores, sendo apresentada a mensagem de erro apropriada quando há tentativa de acesso</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
    <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/19fe4091-1b0e-4788-b5d6-c1d9b16eb9da"/></td>
  </tr>
  <tr>
    <td ></td>
  </tr>
</table>


## Parte 2 - Testes por pares
A fim de aumentar a qualidade da aplicação desenvolvida, cada funcionalidade deve ser testada por um colega e os testes devem ser evidenciados. O colega "Tester" deve utilizar o caso de teste criado pelo desenvolvedor responsável pela funcionalidade (desenvolveu a funcionalidade e criou o caso de testes descrito no plano de testes).

## Sucesso
<table>
  <tr>
    <th colspan="6" width="1000">CT-013<br>Gerenciar Colaboradores</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O administrador deve conseguir cadastrar, editar e excluir colaboradores.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Maria de Lourdes </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Leonardo Junio </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O administrador conseguiu gerenciar colaboradores com sucesso.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td></td>
  </tr>

  <th colspan="6" width="1000">CT-013<br>Gerenciar Colaboradores</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">Usuários não administradores não devem conseguir gerenciar colaboradores.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Maria de Lourdes </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Leonardo Junio </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema bloqueou corretamente as ações de gerenciamento para usuários não administradores.
</td>
  </tr>
  <tr>
</table>

