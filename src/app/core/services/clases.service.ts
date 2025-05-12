import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Clase } from "../../features/clases/clases.model";

@Injectable({ providedIn: 'root' })
export class ClasesService {
  private clases: Clase[] = [
    { id: 1, nombre: 'Clase 1', horario: '10:00' },
    { id: 2, nombre: 'Clase 2', horario: '14:00' }
  ];

  obtenerClases(): Observable<Clase[]> {
    return of(this.clases);
  }

  agregarClase(clase: Clase): void {
    this.clases.push({ ...clase, id: this.clases.length + 1 });
  }

  editarClase(id: number, clase: Clase): void {
    const index = this.clases.findIndex(c => c.id === id);
    if (index !== -1) this.clases[index] = { ...clase, id };
  }

  eliminarClase(id: number): void {
    this.clases = this.clases.filter(c => c.id !== id);
  }

  obtenerClasePorId(id: number): Clase | undefined {
    return this.clases.find(c => c.id === id);
  }
}
