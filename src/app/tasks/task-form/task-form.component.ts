// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-task-form',
//   imports: [],
//   templateUrl: './task-form.component.html',
//   styleUrl: './task-form.component.scss'
// })
// export class TaskFormComponent {

// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule],
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
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificar se estamos editando (existe :id na rota?)
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      // Carregar a tarefa para edição
      // Aqui seria legal criar getTaskById no service, mas pode reusar getTasks e filtrar
      // ou criar no back-end uma rota GET /tasks/:id, etc.
      // Exemplo rápido (sem rota GET /tasks/:id):
      this.taskService.getTasks().subscribe((tasks) => {
        const found = tasks.find(t => t._id === this.taskId);
        if (found) {
          this.task = found;
        }
      });
    }
  }

  onSave() {
    if (!this.taskId) {
      // criar
      this.taskService.createTask(this.task).subscribe({
        next: (created) => {
          this.router.navigate(['/tasks']);
        },
        error: (err) => console.error(err)
      });
    } else {
      // editar
      this.taskService.updateTask(this.taskId, this.task).subscribe({
        next: (updated) => {
          this.router.navigate(['/tasks']);
        },
        error: (err) => console.error(err)
      });
    }
  }
}

