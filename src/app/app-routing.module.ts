import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [{ path: 'login', component: LoginComponent }, { path: 'alumnos', loadChildren: () => import('./features/alumnos/alumnos.module').then(m => m.AlumnosModule), canActivate: [AuthGuard] }, { path: 'clases', loadChildren: () => import('./features/clases/clases.module').then(m => m.ClasesModule), canActivate: [AuthGuard] }, { path: 'cursos', loadChildren: () => import('./features/cursos/cursos.module').then(m => m.CursosModule), canActivate: [AuthGuard] }, { path: '**', redirectTo: 'login', pathMatch: 'full' },{path: 'admin', canActivate: [AuthGuard, AdminGuard], loadChildren: () => import('./core/guards/admin.guard').then(m => m.AdminGuard)}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
