import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = signal<boolean>(this.checkAuthStatus());
  currentUser = signal<any>(null);

  constructor(private router: Router) {}

  /**
   * Verifica si hay un token de autenticación en el almacenamiento local
   */
  private checkAuthStatus(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('auth_token');
    }
    return false;
  }

  /**
   * Método de login
   * @param email - Correo electrónico del usuario
   * @param password - Contraseña del usuario
   * @returns Promise<boolean> - True si el login fue exitoso
   */
  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
          const token = this.generateToken();
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_email', email);

          this.isAuthenticated.set(true);
          this.currentUser.set({ email });

          this.router.navigate(['/dashboard']);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  }

  /**
   * Método de logout
   */
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  /**
   * Obtener el token de autenticación
   */
  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }


  private generateToken(): string {
    return 'token_' + Math.random().toString(36).substr(2, 9) + '_' + new Date().getTime();
  }
}

