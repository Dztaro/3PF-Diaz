import { TestBed } from '@angular/core/testing';
import { CursosService } from './cursos.service';
import { Curso } from '../../features/cursos/curso.model';

describe('CursosService', () => {
  let service: CursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería retornar cursos iniciales', (done) => {
    service.obtenerCursos().subscribe(cursos => {
      expect(cursos.length).toBe(3);
      expect(cursos[0].nombre).toBe('Curso A');
      done();
    });
  });

  it('debería agregar un curso con nuevo ID', (done) => {
    const nuevoCurso: Curso = { id: 0, nombre: 'Curso Nuevo', duracion: '4 meses' };
    service.agregarCurso(nuevoCurso);

    service.obtenerCursos().subscribe(cursos => {
      const cursoAgregado = cursos.find(c => c.nombre === 'Curso Nuevo');
      expect(cursoAgregado).toBeDefined();
      expect(cursoAgregado?.id).toBeGreaterThan(0);
      done();
    });
  });

  it('debería editar un curso existente', (done) => {
    service.obtenerCursos().subscribe(cursos => {
      const curso = cursos[0];
      const actualizado: Curso = { ...curso, nombre: 'Curso A Modificado' };

      service.editarCurso(actualizado);

      service.obtenerCursos().subscribe(cursosActualizados => {
        const cursoEditado = cursosActualizados.find(c => c.id === curso.id);
        expect(cursoEditado?.nombre).toBe('Curso A Modificado');
        done();
      });
    });
  });

  it('debería eliminar un curso por id', (done) => {
    service.obtenerCursos().subscribe(cursos => {
      const curso = cursos[0];
      service.eliminarCurso(curso.id);

      service.obtenerCursos().subscribe(cursosRestantes => {
        const eliminado = cursosRestantes.find(c => c.id === curso.id);
        expect(eliminado).toBeUndefined();
        done();
      });
    });
  });
});
