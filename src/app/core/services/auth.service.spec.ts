import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login with admin credentials should succeed and set role admin', () => {
    const result = service.login('admin', 'admin');
    expect(result).toBeTrue();
    expect(service.getUserRole()).toBe('admin');
    expect(localStorage.getItem('user')).toContain('"role":"admin"');
  });

  it('login with alumno credentials should succeed and set role user', () => {
    const result = service.login('alumno', 'alumno');
    expect(result).toBeTrue();
    expect(service.getUserRole()).toBe('user');
    expect(localStorage.getItem('user')).toContain('"role":"user"');
  });

  it('login with invalid credentials should fail', () => {
    const result = service.login('foo', 'bar');
    expect(result).toBeFalse();
    expect(service.getUserRole()).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('logout should clear user and navigate to /login', () => {
    spyOn(router, 'navigate');
    service.login('admin', 'admin');
    service.logout();
    expect(localStorage.getItem('user')).toBeNull();
    expect(service.isLogged()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('isLoggedIn should emit correct login status', (done) => {
    service.login('admin', 'admin');
    service.isLoggedIn().subscribe(loggedIn => {
      expect(loggedIn).toBeTrue();
      done();
    });
  });

  it('isLogged should return the current login state', () => {
    expect(service.isLogged()).toBeFalse();
    service.login('admin', 'admin');
    expect(service.isLogged()).toBeTrue();
  });
});
