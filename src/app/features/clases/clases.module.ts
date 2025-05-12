import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasesRoutingModule } from './clases-routing.module';
import { ClasesComponent } from './clases.component';
import { ClaseListComponent } from './pages/clase-list/clase-list.component';
import { ClaseFormComponent } from './pages/clase-form/clase-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ClasesComponent,
    ClaseListComponent,
    ClaseFormComponent,
  ],
  imports: [
    CommonModule,
    ClasesRoutingModule,
    SharedModule
  ]
})
export class ClasesModule { }
