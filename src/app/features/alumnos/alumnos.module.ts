import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';
import { AlumnosListComponent } from './pages/alumnos-list/alumnos-list.component';
import { AlumnoFormComponent } from './pages/alumno-form/alumno-form.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    AlumnosComponent,
    AlumnosListComponent,
    AlumnoFormComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    SharedModule
  ]
})
export class AlumnosModule { }
