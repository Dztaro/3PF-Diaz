import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ClaseListComponent } from './clase-list.component';
import { ClasesService } from '../../../../core/services/clases.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Clase } from '../../clases.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';

describe('ClaseListComponent', () => {
  let component: ClaseListComponent;
  let fixture: ComponentFixture<ClaseListComponent>;
  let clasesServiceSpy: jasmine.SpyObj<ClasesService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockClases: Clase[] = [
    { id: 1, nombre: 'Clase 1', horario: '10:00 - 12:00' },
    { id: 2, nombre: 'Clase 2', horario: '14:00 - 16:00' }
  ];

  beforeEach(async () => {
    clasesServiceSpy = jasmine.createSpyObj('ClasesService', ['obtenerClases', 'eliminarClase']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserRole']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ ClaseListComponent ],
      imports: [ MatCardModule, MatButtonModule ],
      providers: [
        { provide: ClasesService, useValue: clasesServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaseListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    clasesServiceSpy.obtenerClases.and.returnValue(of([]));
    authServiceSpy.getUserRole.and.returnValue('user');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load clases on init', () => {
    clasesServiceSpy.obtenerClases.and.returnValue(of(mockClases));
    authServiceSpy.getUserRole.and.returnValue('user');
    fixture.detectChanges();

    expect(component.clases.length).toBe(2);
    expect(component.clases).toEqual(mockClases);
  });

  it('should show "Nueva Clase" button only for admin', () => {
    clasesServiceSpy.obtenerClases.and.returnValue(of(mockClases));

    authServiceSpy.getUserRole.and.returnValue('user');
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeNull();

    authServiceSpy.getUserRole.and.returnValue('admin');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent).toContain('Nueva Clase');
  });

  it('should navigate to edit page on editarClase', () => {
    clasesServiceSpy.obtenerClases.and.returnValue(of(mockClases));
    authServiceSpy.getUserRole.and.returnValue('admin');
    fixture.detectChanges();

    component.editarClase(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/clases/editar', 1]);
  });

  it('should call eliminarClase and reload clases on eliminarClase', fakeAsync(() => {
    clasesServiceSpy.obtenerClases.and.returnValue(of(mockClases));
    clasesServiceSpy.eliminarClase.and.callFake(() => {
      // Simular eliminar para que al recargar devuelva solo uno
      clasesServiceSpy.obtenerClases.and.returnValue(of([mockClases[1]]));
    });
    authServiceSpy.getUserRole.and.returnValue('admin');
    fixture.detectChanges();

    component.eliminarClase(1);
    tick();

    expect(clasesServiceSpy.eliminarClase).toHaveBeenCalledWith(1);
    expect(component.clases.length).toBe(1);
    expect(component.clases[0].id).toBe(2);
  }));

  it('should navigate to new clase page on nuevaClase', () => {
    clasesServiceSpy.obtenerClases.and.returnValue(of(mockClases));
    authServiceSpy.getUserRole.and.returnValue('admin');
    fixture.detectChanges();

    component.nuevaClase();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/clases/nuevo']);
  });

});
