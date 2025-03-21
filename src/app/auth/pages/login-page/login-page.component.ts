import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string | null = null;
  public successMessage: string | null = null;
  public isLoading = false;
  public users?: User[];

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login({ email, password }).subscribe({
        next: () => {
          this.successMessage = 'Inicio de sesión correcto';
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.message || 'Error al iniciar sesión';
          this.isLoading = false;
        },
      });
    } else {
      this.errorMessage = 'Correo y/o contraseña incorrectos';
      this.isLoading = false;
    }
  }

  ngOnInit() {
    this.authService.getUserAll().subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }
}
