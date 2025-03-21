import { Component, computed, effect, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces/auth-status.enum';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public authStatusChangedEffect = effect(() => {
    switch (this.authService.authStatusLogin()) {
      case AuthStatus.authenticated:
        this.router.navigate(['/dashboard']);
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigate(['/login']);
        return;
    }
  });

  constructor(private authService: AuthService, private router: Router) {}
}
