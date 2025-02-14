// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // ou conforme URL do seu back-end

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string }> {
    // Supondo que no back-end exista rota POST /login que retorna { token: string }
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  // Exemplo de método simples para verificar se está logado:
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
