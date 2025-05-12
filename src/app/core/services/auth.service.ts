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
      this.loggedIn$.next(true);
      return true;
    }
    return false;
  }

  logout() {
    this.loggedIn$.next(false);
    this.router.navigate(['/login'])
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  isLogged(): boolean {
    return this.loggedIn$.value;
  }
}
