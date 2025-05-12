import { Component, OnInit } from '@angular/core';
import { ClasesService } from '../../../../core/services/clases.service';
import { Clase } from '../../clases.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clase-list',
  standalone: false,
  templateUrl: './clase-list.component.html',
  styleUrl: './clase-list.component.scss'
})
export class ClaseListComponent implements OnInit {

  clases: Clase[] = [];

  constructor(private clasesService: ClasesService, private router: Router) { }

  ngOnInit(): void {
    this.clasesService.obtenerClases().subscribe((clases) => {
      this.clases = clases;
    });
  }

  editarClase(id: number): void {
    this.router.navigate(['/clases/editar', id]);
  }

  eliminarClase(id: number): void {
    this.clasesService.eliminarClase(id);
    this.ngOnInit();
  }

  nuevaClase(): void {
    this.router.navigate(['/clases/nuevo']);
  }

}
