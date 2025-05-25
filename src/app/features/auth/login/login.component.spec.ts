import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call auth.login with usuario and password', () => {
    component.usuario = 'testuser';
    component.password = '1234';
    authServiceSpy.login.and.returnValue(true);

    component.login();

    expect(authServiceSpy.login).toHaveBeenCalledWith('testuser', '1234');
  });

  it('should navigate to /alumnos if login is successful', () => {
    authServiceSpy.login.and.returnValue(true);

    component.login();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/alumnos']);
  });

  it('should alert if login fails', () => {
    authServiceSpy.login.and.returnValue(false);
    spyOn(window, 'alert');

    component.login();

    expect(window.alert).toHaveBeenCalledWith('Credenciales incorrectas');
  });
});

