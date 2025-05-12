import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos.component';
import { AlumnoFormComponent } from './pages/alumno-form/alumno-form.component';
import { AlumnosListComponent } from './pages/alumnos-list/alumnos-list.component';

const routes: Routes = [
  {
    path: '',
    component: AlumnosComponent,
    children: [
      { path: '', component: AlumnosListComponent },
      { path: 'nuevo', component: AlumnoFormComponent },
      { path: 'editar/:id', component: AlumnoFormComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
