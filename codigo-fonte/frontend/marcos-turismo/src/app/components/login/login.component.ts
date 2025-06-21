import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  mensagem: string = ''; // Mensagem para exibir ao usuário
  enviando = false;
  showSnackbar = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.mensagem = '⚠️ Creedenciais inválidas!';
      // Limpa o erro após 6 segundos
      setTimeout(() => {
        this.mensagem = '';
      }, 6000);
      return;
    }

    this.enviando = true;
    const email = this.loginForm.get('login')?.value;
    const senha = this.loginForm.get('senha')?.value;

    this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, senha }, { withCredentials: true })
      .subscribe({
        next: (response: { token: string }) => {
          console.log('Resposta do servidor:', response);
          this.showSnackbar = true;

          if (response.token) {
            // Armazenando o token no localStorage
            localStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard']);
          } else {
            this.mensagem = 'Erro: Token não recebido.';
          }
          // Esconde o snackbar após 4 segundos
          setTimeout(() => {
            this.showSnackbar = false;
          }, 4000);
          this.enviando = false;
        },
        error: (error: HttpErrorResponse) => {
          this.enviando = false;
          console.error('Erro ao conectar ao servidor:', error);

          // Mensagens específicas para cada erro
          switch (error.status) {
            case 400:
              this.mensagem = '⚠️ Email e senha são obrigatórios!';
              break;
            case 401:
              this.mensagem = '❌ Credenciais incorretas!';
              break;
            case 500:
              this.mensagem = '❌ Erro interno ao processar login.';
              break;
            case 0:
              this.mensagem = '🌐 Não foi possível conectar ao servidor. Verifique sua conexão.';
              break;
            default:
              this.mensagem = error.error || 'Erro ao fazer login. Tente novamente.';
          }
          // Limpa o erro após 6 segundos
          setTimeout(() => {
            this.mensagem = '';
          }, 6000);
        }
      });
  }

   voltar() {
    window.location.href = 'https://www.marcosturismo.com.br/';
  }
}
