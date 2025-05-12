import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '3PF-DIaz';

  constructor(private auth: AuthService) { }

  logout() {
    this.auth.logout();
  }
}
