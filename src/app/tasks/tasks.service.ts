// src/app/tasks/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  _id?: string;
  title: string;
  description?: string;
  status?: 'todo' | 'doing' | 'done';
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root' // disponibiliza o serviço em toda a aplicação
})

export class TaskService {
  private apiUrl = 'https://task-manager-api-a5c3.onrender.com'; // ajuste conforme sua API

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task);
  }

  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`, task);
  }

  deleteTask(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/tasks/${id}`);
  }
}
