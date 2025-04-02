import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

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
      alert('Email e senha são obrigatórios'); // Mensagem padronizada com o back-end
      return;
    }
  
    const email = this.loginForm.get('login')?.value;
    const senha = this.loginForm.get('senha')?.value;
  
    this.http.post<any>('http://localhost:8080/auth/login', { email, senha }, { withCredentials: true })
      .subscribe({
        next: (response: { token: string }) => {
          console.log('Resposta do servidor:', response);
  
          if (response.token) {
            localStorage.setItem('token', response.token);
            alert('Login bem-sucedido!');
            this.router.navigate(['/dashboard']);
          } else {
            alert('Erro: Token não recebido.');
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erro ao conectar ao servidor:', error);
  
          // Tratamento de mensagens conforme os códigos de erro do backend
          switch (error.status) {
            case 400:
              alert('Email e senha são obrigatórios');
              break;
            case 401:
              alert('Credenciais inválidas');
              break;
            case 500:
              alert('Erro interno ao processar login');
              break;
            default:
              alert(error.error || 'Erro ao fazer login. Tente novamente.');
          }
        }
      });
  }
}
