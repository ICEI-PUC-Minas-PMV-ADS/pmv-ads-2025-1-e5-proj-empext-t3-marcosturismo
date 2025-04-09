import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  mensagem: string = ''; // Mensagem para exibir ao usuário
  mensagemTipo: 'success' | 'error' | '' = ''; // Para indicar se a mensagem é de sucesso ou erro

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
      this.mensagem = 'Email e senha são obrigatórios';
      this.mensagemTipo = 'error';
      return;
    }

    const email = this.loginForm.get('login')?.value;
    const senha = this.loginForm.get('senha')?.value;

    this.http.post<any>('http://localhost:8080/auth/login', { email, senha }, { withCredentials: true })
      .subscribe({
        next: (response: { token: string }) => {
          console.log('Resposta do servidor:', response);

          if (response.token) {
            // Armazenando o token no localStorage
            localStorage.setItem('token', response.token);
            this.mensagem = 'Login bem-sucedido!';
            this.mensagemTipo = 'success';
            this.router.navigate(['/dashboard']);
          } else {
            this.mensagem = 'Erro: Token não recebido.';
            this.mensagemTipo = 'error';
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erro ao conectar ao servidor:', error);

          // Mensagens específicas para cada erro
          switch (error.status) {
            case 400:
              this.mensagem = 'Email e senha são obrigatórios';
              this.mensagemTipo = 'error';
              break;
            case 401:
              this.mensagem = 'Credenciais inválidas';
              this.mensagemTipo = 'error';
              break;
            case 500:
              this.mensagem = 'Erro interno ao processar login';
              this.mensagemTipo = 'error';
              break;
            default:
              this.mensagem = error.error || 'Erro ao fazer login. Tente novamente.';
              this.mensagemTipo = 'error';
          }
        }
      });
  }
}
