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
    <td width="430">Israel Cunha</td>
  </tr>
 <tr>
    <td><strong>Tipo do Teste</strong></td>
    <td width="430">Sucesso</td>
  </tr> 
  <tr>
    <td><strong>Requisitos associados</strong></td>
    <td>RF-001:O sistema deve permitir que apenas colaboradores e o administrador se autentiquem e acessem o painel de gestão./td>
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
    <td width="430">Israel Cunha</td>
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
    <td width="430">Israel Cunha</td>
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


<table>
  <tr>
    <th colspan="6" width="1000">CT-001<br>Autenticação com Credenciais Válidas</th>
  </tr>
  <tr>
    <td width="170"><strong>Critérios de êxito</strong></td>
    <td colspan="5">O sistema deve exibir uma mensagem de erro e impedir o login quando credenciais inválidas forem inseridas.</td>
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
    <td colspan="5">O sistema está permitindo fazer login corretamente e está exibindo a mensagem se for credenciais inválidas.</td>
  </tr>
  <tr>
    <td colspan="6" align="center"><strong>Evidência</strong></td>
  </tr>
  <tr>
    <td colspan="6" align="center"><video src="https://github.com/user-attachments/assets/4c3d2cf5-106e-430c-b0ef-d1067b7a36ba"/></td>
  </tr>
</table>

