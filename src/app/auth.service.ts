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

  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { email, password });
  }

  rememberPassword(email: string): Observable<{ message: string, password: string }> {
    return this.http.post<{ message: string, password: string }>(`${this.apiUrl}/forgot-password`, { email });
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
