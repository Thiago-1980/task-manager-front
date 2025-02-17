import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';

// Exemplo, se TaskList e TaskForm são standalone, use loadComponent:
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'register', component: RegisterComponent },
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
    ],
    canActivate: [AuthGuard] // proteção do login
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
