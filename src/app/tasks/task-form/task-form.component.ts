// src/app/tasks/task-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from '../tasks.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  task: Partial<Task> = {
    title: '',
    description: '',
    status: 'todo'
  };
  taskId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    // Verificar se estamos editando (existe :id na rota?)
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: string) {
    // O ideal é ter um getTaskById no back-end (GET /tasks/:id).
    // Se não tiver, você pode filtrar localmente via getTasks()
    // mas não é tão eficiente. Vou usar getTasks() como exemplo:
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        const found = tasks.find(t => t._id === id);
        if (found) {
          this.task = found;
        }
      },
      error: (err) => console.error('Erro ao buscar tarefa para edição', err)
    });
  }

  onSave() {
    if (!this.task.title) {
      alert('Título é obrigatório!');
      return;
    }
    // Se não há taskId => criar
    if (!this.taskId) {
      this.taskService.createTask(this.task).subscribe({
        next: (created) => {
          console.log('Tarefa criada', created);
          this.router.navigate(['/tasks']);
        },
        error: (err) => console.error('Erro ao criar tarefa', err)
      });
    } else {
      // Edição
      this.taskService.updateTask(this.taskId, this.task).subscribe({
        next: (updated) => {
          console.log('Tarefa atualizada', updated);
          this.router.navigate(['/tasks']);
        },
        error: (err) => console.error('Erro ao atualizar tarefa', err)
      });
    }
  }
}
