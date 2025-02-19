import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any[]>('https://task-manager-api-a5c3.onrender.com/tasks', { headers })
      // .subscribe({
      //   next: (tasksData) => this.tasks = tasksData,
      //   error: (err) => console.error('Erro ao buscar tarefas', err)
      .subscribe((tasks) => this.tasks = tasks);
    
  }

  deleteTask(taskId: string): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.delete(`https://task-manager-api-a5c3.onrender.com/tasks/${taskId}`, { headers })
      .subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t._id !== taskId);
        },
        error: (err) => console.error('Erro ao excluir tarefa', err)
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'todo':
        return 'A fazer';
      case 'doing':
        return 'Em andamento';
      case 'done':
        return 'Concluída';
      default:
        return status; // Se vier algo inesperado, retorna como está
    }
  }
  
}
