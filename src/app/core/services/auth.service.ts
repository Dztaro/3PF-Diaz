import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) { }

login(usuario: string, password: string): boolean {
  if (usuario === 'admin' && password === 'admin') {
    const user = { username: 'admin', role: 'admin' };
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedIn$.next(true);
    return true;
  } else if (usuario === 'alumno' && password === 'alumno') {
    const user = { username: 'alumno', role: 'user' };
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedIn$.next(true);
    return true;
  }

  return false;
}

getUserRole(): string | null {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user).role : null;
}


logout() {
  localStorage.removeItem('user');
  this.loggedIn$.next(false);
  this.router.navigate(['/login']);
}


  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  isLogged(): boolean {
    return this.loggedIn$.value;
  }
}
