// src/app/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        // Ao logar com sucesso, salvamos o token
        this.authService.setToken(res.token);
        // Redireciona para as tarefas
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        // Tratamento de erro simples
        this.errorMessage = 'Falha no login. Verifique suas credenciais.';
        console.error('Login falhou', err);
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  forgotPassword() {
    // Aqui, podemos abrir um prompt ou modal solicitando o email,
    // depois chamar o AuthService para a rota de "lembrar senha"
    const emailRecuperacao = prompt('Informe seu email para recuperar a senha:');
    if (!emailRecuperacao) return;

    this.authService.rememberPassword(emailRecuperacao).subscribe({
      next: (res) => {
        // Se o backend retornar algo como { message: 'Senha enviada' }, por exemplo
        alert(res.message);
      },
      error: (err) => {
        alert(err.error.message || 'Erro ao recuperar senha');
      }
    });
  }
}
