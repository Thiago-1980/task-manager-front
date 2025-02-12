// import { Routes } from '@angular/router';

// export const routes: Routes = [
//     {
//       path: 'tasks',
//       loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
//     }
//   ];

// src/app/routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent // ou loadComponent se for standalone
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
