// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-task-list',
//   imports: [],
//   templateUrl: './task-list.component.html',
//   styleUrl: './task-list.component.scss'
// })
// export class TaskListComponent {

// }

// src/app/tasks/task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../tasks.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error('Erro ao buscar tarefas:', err);
      }
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: (res) => {
        console.log(res.message);
        this.loadTasks(); // recarrega a lista
      },
      error: (err) => {
        console.error('Erro ao deletar tarefa:', err);
      }
    });
  }
}

