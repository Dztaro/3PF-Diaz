import { TestBed } from '@angular/core/testing';
import { ClasesService } from './clases.service';
import { Clase } from '../../features/clases/clases.model';

describe('ClasesService', () => {
  let service: ClasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('obtenerClases should return initial clases', (done) => {
    service.obtenerClases().subscribe(clases => {
      expect(clases.length).toBe(2);
      expect(clases[0].nombre).toBe('Clase 1');
      done();
    });
  });

  it('agregarClase should add a clase with incremented id', () => {
    const nuevaClase: Clase = { id: 0, nombre: 'Clase 3', horario: '18:00' };
    service.agregarClase(nuevaClase);

    const clases = service['clases']; // acceso directo para test
    expect(clases.length).toBe(3);
    expect(clases[2].id).toBe(3);
    expect(clases[2].nombre).toBe('Clase 3');
  });

  it('editarClase should update the clase data', () => {
    const claseEditada: Clase = { id: 1, nombre: 'Clase 1 editada', horario: '11:00' };
    service.editarClase(1, claseEditada);

    const clase = service.obtenerClasePorId(1);
    expect(clase).toBeDefined();
    expect(clase?.nombre).toBe('Clase 1 editada');
    expect(clase?.horario).toBe('11:00');
  });

  it('editarClase should do nothing if id not found', () => {
    const claseEditada: Clase = { id: 99, nombre: 'No existe', horario: '00:00' };
    service.editarClase(99, claseEditada);

    const clase = service.obtenerClasePorId(99);
    expect(clase).toBeUndefined();
  });

  it('eliminarClase should remove clase by id', () => {
    service.eliminarClase(1);
    const clases = service['clases'];
    expect(clases.length).toBe(1);
    expect(clases.find(c => c.id === 1)).toBeUndefined();
  });

  it('obtenerClasePorId should return correct clase or undefined', () => {
    const clase = service.obtenerClasePorId(2);
    expect(clase).toBeDefined();
    expect(clase?.nombre).toBe('Clase 2');

    const noExiste = service.obtenerClasePorId(999);
    expect(noExiste).toBeUndefined();
  });

});
