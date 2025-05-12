import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from '../../features/alumnos/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private alumnos: Alumno[] = [];
  private alumnosSubject: BehaviorSubject<Alumno[]> = new BehaviorSubject<Alumno[]>(this.alumnos);

  constructor() { }

  getAlumnos(): Observable<Alumno[]> {
    return this.alumnosSubject.asObservable();
  }

  getAlumnoPorId(id: number): Alumno | undefined {
    return this.alumnos.find(alumno => alumno.id === id);
  }

  agregarAlumno(alumno: Alumno): void {
    const index = this.alumnos.findIndex(a => a.id === alumno.id);
    if (index !== -1) {
      this.alumnos[index] = alumno;
    } else {
      this.alumnos.push(alumno);
    }
    this.alumnosSubject.next([...this.alumnos]); // Notificamos cambio
  }

  eliminarAlumno(id: number): void {
    this.alumnos = this.alumnos.filter(alumno => alumno.id !== id);
    this.alumnosSubject.next([...this.alumnos]); // Notificamos cambio
  }
}
