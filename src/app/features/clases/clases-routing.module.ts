import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaseListComponent } from './pages/clase-list/clase-list.component';
import { ClaseFormComponent } from './pages/clase-form/clase-form.component';
import { ClasesComponent } from './clases.component';

const routes: Routes = [
  {
    path: '',
    component: ClasesComponent,
    children: [
      { path: '', component: ClaseListComponent },
      { path: 'nuevo', component: ClaseFormComponent },
      { path: 'editar/:id', component: ClaseFormComponent },
    ]
  }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasesRoutingModule { }
