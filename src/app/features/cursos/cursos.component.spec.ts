import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursosComponent } from './cursos.component';
import { CursosService } from '../../core/services/cursos.service';
import { AuthService } from '../../core/services/auth.service';
import { of } from 'rxjs';
import { Curso } from './curso.model';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CursosComponent', () => {
  let component: CursosComponent;
  let fixture: ComponentFixture<CursosComponent>;
  let cursosServiceSpy: jasmine.SpyObj<CursosService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const cursosSpy = jasmine.createSpyObj('CursosService', ['obtenerCursos', 'agregarCurso', 'editarCurso', 'eliminarCurso']);
    const authSpy = jasmine.createSpyObj('AuthService', ['getUserRole']);

    await TestBed.configureTestingModule({
      declarations: [CursosComponent],
      providers: [
        { provide: CursosService, useValue: cursosSpy },
        { provide: AuthService, useValue: authSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignorar elementos de Angular Material o directivas desconocidas
    }).compileComponents();

    cursosServiceSpy = TestBed.inject(CursosService) as jasmine.SpyObj<CursosService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    cursosServiceSpy.obtenerCursos.and.returnValue(of([
      { id: 1, nombre: 'Curso 1', duracion: '10h' },
      { id: 2, nombre: 'Curso 2', duracion: '20h' }
    ]));
    authServiceSpy.getUserRole.and.returnValue('admin');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar cursos desde el servicio', (done) => {
    component.cursos$.subscribe(cursos => {
      expect(cursos.length).toBe(2);
      done();
    });
  });

  it('debería retornar true en isAdmin si el usuario es admin', () => {
    expect(component.isAdmin).toBeTrue();
  });

  it('debería llamar agregarCurso del servicio y limpiar formulario', () => {
    component.nombre = 'Nuevo Curso';
    component.duracion = '15h';

    component.agregarCurso();

    expect(cursosServiceSpy.agregarCurso).toHaveBeenCalledWith(jasmine.objectContaining({
      nombre: 'Nuevo Curso',
      duracion: '15h'
    }));

    expect(component.nombre).toBe('');
    expect(component.duracion).toBe('');
  });

  it('debería asignar curso para editar', () => {
    const curso: Curso = { id: 3, nombre: 'Editar Curso', duracion: '5h' };
    component.editar(curso);
    expect(component.editandoCurso).toEqual(curso);
    expect(component.nombre).toBe(curso.nombre);
    expect(component.duracion).toBe(curso.duracion);
  });

  it('debería llamar editarCurso del servicio y limpiar formulario', () => {
    const curso: Curso = { id: 4, nombre: 'Curso Editado', duracion: '12h' };
    component.editandoCurso = curso;
    component.nombre = curso.nombre;
    component.duracion = curso.duracion;

    component.guardarEdicion();

    expect(cursosServiceSpy.editarCurso).toHaveBeenCalledWith(curso);
    expect(component.editandoCurso).toBeNull();
  });

  it('debería llamar eliminarCurso del servicio', () => {
    component.eliminarCurso(5);
    expect(cursosServiceSpy.eliminarCurso).toHaveBeenCalledWith(5);
  });

  it('cancelar debería limpiar el formulario', () => {
    component.nombre = 'Nombre';
    component.duracion = 'Duracion';
    component.editandoCurso = { id: 1, nombre: 'x', duracion: 'x' };

    component.cancelar();

    expect(component.nombre).toBe('');
    expect(component.duracion).toBe('');
    expect(component.editandoCurso).toBeNull();
  });
});
