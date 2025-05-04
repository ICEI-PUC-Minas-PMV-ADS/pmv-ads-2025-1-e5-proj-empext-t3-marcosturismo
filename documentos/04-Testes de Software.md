# Planos de Testes de Software

Apresente os casos de testes utilizados na realização da verificação e validação da aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos bem como o tratamento de erros (robustez da aplicação).

### Tipo de Teste
- **Sucesso**: Tem o objetivo de verificar se as funcionalidades funcionam corretamente.
- **Insucesso**: Tem o objetivo de verificar se o sistema trata erros de maneira correta.

#### Exemplo de Caso de Teste de Sucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-001<br>Autenticação e Acesso ao Painel de Gestão
</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se apenas colaboradores e o administrador podem se autenticar e acessar o painel de gestão com credenciais válidas.

</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Israel Cunha da Silva</td>
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
      - <strong>E-mail:</strong> Colocar e-mail cadastrado na base de colaboradores ou administradores.<br>
      - <strong>Senha:</strong> Colocar senha válida correspondente ao e-mail informado.
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td>O sistema deve permitir o login e redirecionar o usuário autenticado para o painel de gestão.</td>
  </tr>
</table>

#### Exemplo de Caso de Teste de Insucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-001<br>Autenticação com Credenciais Inválidas</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>Este caso de teste verifica se o sistema impede a autenticação de usuários com credenciais inválidas.</td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430"> Cunha</td>
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
      - <strong>E-mail:</strong> Colocar um e-mail válido de colaborador ou administrador.<br>
      - <strong>Senha:</strong> Colocar uma senha incorreta.
  </tr>
     - <strong>E-mail:</strong> Colocar um e-mail não cadastrado.<br>
      - <strong>Senha:</strong> Colocar uma senha válida correspondente a um usuário real.
  </tr>
   - <strong>E-mail:</strong>  Inserir um e-mail inválido.<br>
      - <strong>Senha:</strong> Inserir uma senha incorreta.
  </tr>
   - <strong>Ambos:</strong> Deixar o campo de e-mail ou senha vazio e tentar autenticar.<br>
     
  </tr>
    <tr>
    <td><strong>Critérios de êxito</strong></td>
    <td> - O sistema deve exibir uma mensagem de erro informando que as credenciais são inválidas.
    <br>
    - O usuário não deve ser autenticado nem redirecionado para o painel de gestão.</td>
  </tr>
</table>

 
# Evidências de Testes de Software

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.

## Parte 1 - Testes Unitários
Cada funcionalidade desenvolvida deve ser testada utilizando os casos de testes (sucesso e insucesso) criados pelo responsável pela funcionalidade. Todos os testes devem ser evidenciados.

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
    <td width="430"> Cunha</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">02/04/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema autenticou corretamente o usuário e redirecionou para a página inicial sem erros.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/4b68115f-77fc-4deb-a3b2-efed417e4886"/></td>
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
    <td width="150">02/04/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema bloqueou corretamente o login com credenciais inválidas e exibiu a mensagem de erro esperada.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/25a56887-d348-4f19-886f-9346d52ade33"/></td>
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
    <td width="150">05/04/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está permitindo o login corretamente e redirecionando o usuário para o painel administrativo.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/92e25d4e-d0ad-41cd-aa64-e4319bd5405e"/></td>
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
      Este caso de teste verifica se o administrador pode cadastrar, editar e excluir colaboradores com sucesso.     
    </td>
  </tr>
  <tr>
    <td><strong>Responsável Caso de Teste </strong></td>
    <td width="430">Israel Cunha da Silva</td>
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
    <td colspan="6" align="center"><video src="INSIRA O VÍDEO AQUI"/></td>
  </tr>
</table>

#### Caso de Teste de Insucesso
<table>
  <tr>
    <th colspan="2" width="1000">CT-002 Tentativa de Gerenciamento de Colaboradores com Acesso Não Administrativo</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td> Este caso de teste verifica se o sistema impede que usuários que não sejam administradores realizem operações de cadastro, edição e exclusão de colaboradores.</td>
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
    <th colspan="6" width="1000">CT-001<br>Autenticação com Credenciais Válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve permitir o login e redirecionar o usuário para a página inicial após a autenticação bem-sucedida.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> Cunha</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">02/04/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema autenticou corretamente o usuário e redirecionou para a página inicial sem erros.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/4b68115f-77fc-4deb-a3b2-efed417e4886"/></td>
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
    <td width="150">02/04/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema bloqueou corretamente o login com credenciais inválidas e exibiu a mensagem de erro esperada.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/25a56887-d348-4f19-886f-9346d52ade33"/></td>
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
    <td width="150">05/04/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está permitindo o login corretamente e redirecionando o usuário para o painel administrativo.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/92e25d4e-d0ad-41cd-aa64-e4319bd5405e"/></td>
  </tr>
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
    <td width="430">Jefferson Freitas da Silva</td>
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
    <th colspan="6" width="1000">CT-001<br>Autenticação com Credenciais Válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve permitir o login e redirecionar o usuário para a página inicial após a autenticação bem-sucedida.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> Cunha</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">02/04/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema autenticou corretamente o usuário e redirecionou para a página inicial sem erros.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/4b68115f-77fc-4deb-a3b2-efed417e4886"/></td>
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
    <td width="150">02/04/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema bloqueou corretamente o login com credenciais inválidas e exibiu a mensagem de erro esperada.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/25a56887-d348-4f19-886f-9346d52ade33"/></td>
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
    <td width="150">05/04/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está permitindo o login corretamente e redirecionando o usuário para o painel administrativo.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/92e25d4e-d0ad-41cd-aa64-e4319bd5405e"/></td>
  </tr>
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

#### Exemplo de Caso de Teste de Insucesso
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
    <td width="430">Devi Reis</td>
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
    <th colspan="6" width="1000">CT-001<br>Autenticação com Credenciais Válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">Este caso de teste verifica se o administrador pode criar, editar e excluir viagens com sucesso</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Jefferson Freitas</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema permitiu que apenas o administrador crie, edite e exclua viagens.</td>
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
    <td width="150">02/04/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema bloqueou corretamente o login com credenciais inválidas e exibiu a mensagem de erro esperada.</td>
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
    <th colspan="6" width="1000">CT-004<br>Autenticação com Credenciais Válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve permitir que o administrador cadastre, edite e exclua veículos da frota.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Israel Cunha </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">COLOCAR NOME DA PESSOA </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">05/04/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">•	O sistema permite o cadastro de um novo veículo e exibe uma mensagem de sucesso.</td>
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
    <th colspan="6" width="1000">CT-004<br>Autenticação com Credenciais Válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">•	O sistema permite o cadastro de um novo veículo e exibe uma mensagem de sucesso.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Davi Reis </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Davi Reis </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">05/04/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está permitindo fazer login corretamente e está exibindo a mensagem se for credenciais inválidas.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="COLOCAR VIDEO"/></td>
  </tr>
</table>


## CT-005
#### Exemplo de Caso de Teste de Sucesso
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

#### Exemplo de Caso de Teste de Insucesso
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
    <th colspan="6" width="1000">CT-006<br>Autenticação com Credenciais Válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Descrição</strong></td>
    <td colspan="5">Este caso de teste verifica se o sistema deve permitir que o colaborador inicie sua viagem somente após a realização do checklist do veículo.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Jefferson Freitas</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">04/05/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">•	O sistema aceita a quilometragem inserida e permite a finalização da viagem.Ao confirmar, a viagem é registrada como finalizada e a quilometragem é vinculada aos dados da viagem. O sistema exibe uma mensagem de sucesso confirmando a finalização da viagem.
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
    <th colspan="6" width="1000">CT-001<br>Autenticação com Credenciais Inválidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">•	O sistema não permite a finalização da viagem sem a inserção de uma quilometragem válida.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430">Jefferson Freitas</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">02/04/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">•	Ao tentar finalizar a viagem sem a quilometragem, o sistema exibe uma mensagem de erro informando que a quilometragem é obrigatória. Nenhuma alteração no status da viagem ocorre até que a quilometragem seja corretamente informada.
</td>
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
    <th colspan="6" width="1000">CT-005<br>Autenticação com Credenciais Válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve permitir que o colaborador inicie sua viagem somente após a realização do checklist do veículo.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Jefferson Freitas </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">COLOCAR NOME DA PESSOA </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">05/04/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">•	O sistema permite o cadastro de um novo veículo e exibe uma mensagem de sucesso.</td>
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
    <td colspan="5">•	O sistema permite o cadastro de um novo veículo e exibe uma mensagem de sucesso.</td>
  </tr>
    <tr>
    <td><strong>Responsável pela funcionalidade</strong></td>
    <td width="430">Davi Reis </td>
      <td><strong>Responsável pelo teste</strong></td>
    <td width="430">Davi Reis </td>
     <td width="100"><strong>Data do teste</strong></td>
    <td width="150">05/04/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está permitindo fazer login corretamente e está exibindo a mensagem se for credenciais inválidas.</td>
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
    <th colspan="6" width="1000">CT-001<br>Autenticação com Credenciais Válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve permitir o login e redirecionar o usuário para a página inicial após a autenticação bem-sucedida.</td>
  </tr>
  <tr>
    <td><strong>Responsável pelo Teste</strong></td>
    <td width="430"> Cunha</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">02/04/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema autenticou corretamente o usuário e redirecionou para a página inicial sem erros.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/4b68115f-77fc-4deb-a3b2-efed417e4886"/></td>
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
    <td width="150">02/04/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema bloqueou corretamente o login com credenciais inválidas e exibiu a mensagem de erro esperada.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/25a56887-d348-4f19-886f-9346d52ade33"/></td>
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
    <td width="150">05/04/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está permitindo o login corretamente e redirecionando o usuário para o painel administrativo.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/92e25d4e-d0ad-41cd-aa64-e4319bd5405e"/></td>
  </tr>
</table>



## CT-007
#### Caso de Teste de Sucesso 
<table>
  <tr>
    <th colspan="2" width="1000">CT-006 Registro de Serviço Realizado no Veículo</th>
  </tr>
  <tr>
    <td width="150"><strong>Descrição</strong></td>
    <td>
      Este caso de teste verifica se o administrador consegue registrar um serviço realizado em um veículo com sucesso.  
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
    <td colspan="6" align="center"><video src="INSIRA O VÍDEO AQUI"/></td>
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
    <td width="430"> Israel Cunha </td>
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
</table>

 
# Evidências de Testes de Software

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.

## Parte 1 - Testes Unitários
Cada funcionalidade desenvolvida deve ser testada utilizando os casos de testes (sucesso e insucesso) criados pelo responsável pela funcionalidade. Todos os testes devem ser evidenciados.

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
    <td width="430"> Cunha</td>
    <td width="100"><strong>Data do Teste</strong></td>
    <td width="150">02/04/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema autenticou corretamente o usuário e redirecionou para a página inicial sem erros.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/4b68115f-77fc-4deb-a3b2-efed417e4886"/></td>
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
    <td width="150">02/04/2025</td>
  </tr>
  <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema bloqueou corretamente o login com credenciais inválidas e exibiu a mensagem de erro esperada.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/25a56887-d348-4f19-886f-9346d52ade33"/></td>
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
    <td width="150">05/04/2024</td>
  </tr>
    <tr>
    <td width="170"><strong>Comentário</strong></td>
    <td colspan="5">O sistema está permitindo o login corretamente e redirecionando o usuário para o painel administrativo.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/92e25d4e-d0ad-41cd-aa64-e4319bd5405e"/></td>
  </tr>
</table>

