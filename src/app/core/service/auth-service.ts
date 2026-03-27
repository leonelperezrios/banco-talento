import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private storageService = inject(StorageService);

  private sessionUpdated = signal<number>(0);

  isAuthenticated = computed(() => {
    this.sessionUpdated();
    return this.storageService.hasSession();
  });

  currentUser = signal<any>(null);


  private readonly mockDelayMs = environment.auth.mockDelayMs;
  private readonly loginRedirectUrl = environment.auth.loginRedirectUrl;
  private readonly logoutRedirectUrl = environment.auth.logoutRedirectUrl;

  constructor() {}

  /**
   * Para actualizar el estado de autenticación
   */
  private updateSessionState(): void {
    this.sessionUpdated.update(v => v + 1);
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

          // Guardar en storage
          this.storageService.setToken(token);
          this.storageService.setUserEmail(email);

          // Actualizar signals
          this.updateSessionState();
          this.currentUser.set({ email });

          this.router.navigate([this.loginRedirectUrl]);
          resolve(true);
        } else {
          resolve(false);
        }
      }, this.mockDelayMs);
    });
  }

  /**
   * Método de logout
   */
  logout(): void {
    this.storageService.clearSession();
    this.updateSessionState();
    this.currentUser.set(null);
    this.router.navigate([this.logoutRedirectUrl]);
  }

  /**
   * Obtener el token de autenticación
   */
  getToken(): string | null {
    return this.storageService.getToken();
  }


  private generateToken(): string {
    return 'token_' + Math.random().toString(36).substr(2, 9) + '_' + new Date().getTime();
  }
}

