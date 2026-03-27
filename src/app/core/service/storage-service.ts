import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly tokenKey = environment.auth.tokenStorageKey;
  private readonly userEmailKey = environment.auth.userEmailStorageKey;

  constructor() {}

  /**
   * Obtener token almacenado
   */
  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  /**
   * Guardar token
   */
  setToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  /**
   * Eliminar token
   */
  removeToken(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
    }
  }

  /**
   * Obtener email del usuario
   */
  getUserEmail(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.userEmailKey);
    }
    return null;
  }

  /**
   * Guardar email del usuario
   */
  setUserEmail(email: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.userEmailKey, email);
    }
  }

  /**
   * Eliminar email del usuario
   */
  removeUserEmail(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.userEmailKey);
    }
  }

  /**
   * Limpiar toda la sesión
   */
  clearSession(): void {
    if (typeof localStorage !== 'undefined') {
      this.removeToken();
      this.removeUserEmail();
    }
  }

  /**
   * Verificar si hay sesión activa
   */
  hasSession(): boolean {
    return this.getToken() !== null;
  }
}
