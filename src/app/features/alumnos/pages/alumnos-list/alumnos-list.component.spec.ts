import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlumnosListComponent } from './alumnos-list.component';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AlumnosListComponent', () => {
  let component: AlumnosListComponent;
  let fixture: ComponentFixture<AlumnosListComponent>;
  let alumnosServiceSpy: jasmine.SpyObj<AlumnosService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    alumnosServiceSpy = jasmine.createSpyObj('AlumnosService', ['getAlumnos', 'eliminarAlumno']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserRole']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Mock de datos iniciales
    alumnosServiceSpy.getAlumnos.and.returnValue(of([]));
    alumnosServiceSpy.eliminarAlumno.and.returnValue(of(void 0));
    authServiceSpy.getUserRole.and.returnValue('admin');

    await TestBed.configureTestingModule({
      declarations: [AlumnosListComponent],
      providers: [
        { provide: AlumnosService, useValue: alumnosServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAlumnos on init', () => {
    expect(alumnosServiceSpy.getAlumnos).toHaveBeenCalled();
  });

  it('should delete alumno and refresh list', () => {
    component.eliminar(1);
    expect(alumnosServiceSpy.eliminarAlumno).toHaveBeenCalledWith(1);
    expect(alumnosServiceSpy.getAlumnos).toHaveBeenCalledTimes(2); // Inicial y tras eliminar
  });

  it('should navigate to edit page', () => {
    component.editar(5);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/alumnos/editar', 5]);
  });

  it('should navigate to add new alumno page', () => {
    component.agregar();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/alumnos/nuevo']);
  });

  it('should return true if user is admin', () => {
    expect(component.isAdmin).toBeTrue();
  });
});
