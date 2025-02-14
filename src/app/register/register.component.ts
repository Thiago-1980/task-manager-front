import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    CommonModule,
    FormsModule // <-- Adicione aqui
  ]
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.email, this.password).subscribe({
      next: (res) => {
        alert('Usuário registrado com sucesso!');
        // Após registro, podemos redirecionar para login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error?.message || 'Erro ao registrar usuário');
      }
    });
  }
}
