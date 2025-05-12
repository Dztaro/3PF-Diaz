import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../core/services/cursos.service';
import { Curso } from './curso.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cursos',
  standalone: false,
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {
  cursos$!: Observable<Curso[]>;

  nombre: string = '';
  duracion: string = '';
  editandoCurso: Curso | null = null;
  columnas: string[] = ['nombre', 'duracion', 'acciones'];

  constructor(private cursosService: CursosService) { }

  ngOnInit(): void {
    this.cursos$ = this.cursosService.obtenerCursos();
  }

  agregarCurso(): void {
    if (this.nombre && this.duracion) {
      this.cursosService.agregarCurso({ id: 0, nombre: this.nombre, duracion: this.duracion });
      this.limpiarFormulario();
    }
  }

  editar(curso: Curso): void {
    this.editandoCurso = { ...curso };
    this.nombre = curso.nombre;
    this.duracion = curso.duracion;
    console.log('editando curso:', curso)
  }

  guardarEdicion(): void {
    if (this.editandoCurso) {
      this.cursosService.editarCurso({ id: this.editandoCurso.id, nombre: this.nombre, duracion: this.duracion });
      this.limpiarFormulario();
    }
  }


  eliminarCurso(id: number): void {
    this.cursosService.eliminarCurso(id);
  }

  cancelar(): void {
    this.limpiarFormulario();
  }

  private limpiarFormulario(): void {
    this.nombre = '';
    this.duracion = '';
    this.editandoCurso = null;
  }
}
