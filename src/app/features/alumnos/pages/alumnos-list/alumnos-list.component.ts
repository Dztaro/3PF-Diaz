import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Alumno } from '../../alumno.model';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-alumnos-list',
  standalone: false,
  templateUrl: './alumnos-list.component.html',
  styleUrl: './alumnos-list.component.scss'
})
export class AlumnosListComponent implements OnInit {
  alumnos$: Observable<Alumno[]>;
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email', 'curso', 'acciones'];

  constructor(public authService: AuthService, private alumnosService: AlumnosService, private router: Router) {
    this.alumnos$ = this.alumnosService.getAlumnos();
  }

  ngOnInit(): void { }

  get isAdmin(): boolean {
    return this.authService.getUserRole() === 'admin';
  }

  eliminar(id: number): void {
    this.alumnosService.eliminarAlumno(id).subscribe(() => {
      this.alumnos$ = this.alumnosService.getAlumnos();
    })
  }

  editar(id: number): void {
    this.router.navigate(['/alumnos/editar', id]);
  }

  agregar(): void {
    this.router.navigate(['/alumnos/nuevo']);
  }
}
