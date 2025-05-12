import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Curso } from '../../features/cursos/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private cursos: Curso[] = [
    { id: 1, nombre: 'Curso A', duracion: '3 meses' },
    { id: 2, nombre: 'Curso B', duracion: '6 meses' },
    { id: 3, nombre: 'Curso C', duracion: '1 año' }
  ];

  private cursosSubject = new BehaviorSubject<Curso[]>([...this.cursos]);

  obtenerCursos(): Observable<Curso[]> {
    return this.cursosSubject.asObservable();
  }

  agregarCurso(curso: Curso): void {
    curso.id = this.generarNuevoId();
    this.cursos.push(curso);
    this.cursosSubject.next([...this.cursos]);
  }

  editarCurso(cursoActualizado: Curso): void {
    const index = this.cursos.findIndex(c => c.id === cursoActualizado.id);
    if (index > -1) {
      this.cursos[index] = cursoActualizado;
      this.cursosSubject.next([...this.cursos]);
    }
  }

  eliminarCurso(id: number): void {
    this.cursos = this.cursos.filter(c => c.id !== id);
    this.cursosSubject.next([...this.cursos]);
  }

  private generarNuevoId(): number {
    return this.cursos.length > 0 ? Math.max(...this.cursos.map(c => c.id)) + 1 : 1;
  }
}
