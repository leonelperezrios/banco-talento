import { Component, signal } from '@angular/core';
import { AuthPageLayout } from '../../../shared/layout/auth-page-layout/auth-page-layout';
import { LoginForm } from '../../../shared/components/account/login-form/login-form';
import { AuthService } from '../../../core/service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [AuthPageLayout, LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  async onSignIn(credentials: { email: string; password: string }) {
    this.errorMessage.set(null);
    this.isLoading.set(true);

    console.log(credentials)

    try {
      const success = await this.authService.login(credentials.email, credentials.password);

      if (!success) {
        this.errorMessage.set('Credenciales inválidas. Intenta nuevamente.');
      } else {
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      this.errorMessage.set('Error en el servidor. Intenta más tarde.');
      console.error('Error de login:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
