import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';

// Exemplo, se TaskList e TaskForm são standalone, use loadComponent:
export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'tasks',
    children: [
      {
        path: '',
        loadComponent: () => import('./tasks/task-list/task-list.component')
          .then(m => m.TaskListComponent)
      },
      {
        path: 'new',
        loadComponent: () => import('./tasks/task-form/task-form.component')
          .then(m => m.TaskFormComponent)
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./tasks/task-form/task-form.component')
          .then(m => m.TaskFormComponent)
      }
    ]
  }
];
