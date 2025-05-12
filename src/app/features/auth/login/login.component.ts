import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  usuario = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    const logged = this.auth.login(this.usuario, this.password);
    if (logged) {
      this.router.navigate(['/alumnos'])
    } else {
      alert('Credenciales incorrectas')
    }
  }

}
