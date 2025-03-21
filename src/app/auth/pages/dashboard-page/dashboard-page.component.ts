import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { delay } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit {
  public user?: User;
  public isLoading = true;

  constructor(private authService: AuthService, private router: Router) {}

  loggout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.authService.getUser().subscribe({
      next: (user) => {
        this.isLoading = false;
        this.user = user;
      },
      error: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
