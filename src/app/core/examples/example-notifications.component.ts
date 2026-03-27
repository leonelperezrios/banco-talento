import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification-service';
import { WebRequestService } from '../service/web-request-service';

/**
 * EJEMPLO DE USO DE LOS INTERCEPTORES Y SERVICIO DE NOTIFICACIONES
 *
 * El interceptor HTTP se encarga de:
 * 1. Mostrar mensajes de éxito para operaciones POST, PUT, PATCH, DELETE
 * 2. Mostrar mensajes de error con manejo específico por código HTTP
 * 3. Capturar y registrar errores en la consola
 *
 * El NotificationService permite:
 * 1. Mostrar notificaciones personalizadas en cualquier parte de la aplicación
 * 2. Controlar la duración, posición y tipo de notificación
 */

@Component({
  selector: 'app-example-notifications',
  template: `
    <div class="p-6 space-y-4">
      <h2 class="text-2xl font-bold">Ejemplos de Notificaciones</h2>

      <!-- Botones de demostración -->
      <div class="flex flex-wrap gap-4">
        <button (click)="testSuccessNotification()" class="btn btn-success">
          Éxito
        </button>
        <button (click)="testErrorNotification()" class="btn btn-error">
          Error
        </button>
        <button (click)="testWarningNotification()" class="btn btn-warning">
          Advertencia
        </button>
        <button (click)="testInfoNotification()" class="btn btn-info">
          Información
        </button>
        <button (click)="testApiCall()" class="btn btn-primary">
          Petición API (Éxito)
        </button>
        <button (click)="testApiError()" class="btn btn-danger">
          Petición API (Error)
        </button>
      </div>
    </div>
  `,
})
export class ExampleNotificationsComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private webRequestService: WebRequestService
  ) {}

  ngOnInit(): void {
    // Mensaje inicial
    this.notificationService.info(
      'Componente de ejemplo cargado correctamente',
      'Bienvenido'
    );
  }

  /**
   * Ejemplo 1: Mostrar notificación de éxito
   */
  testSuccessNotification(): void {
    this.notificationService.success(
      'Esta es una notificación de éxito',
      'Operación Completada',
      { timeOut: 3000 }
    );
  }

  /**
   * Ejemplo 2: Mostrar notificación de error
   */
  testErrorNotification(): void {
    this.notificationService.error(
      'Ha ocurrido un error inesperado',
      'Error',
      { timeOut: 5000 }
    );
  }

  /**
   * Ejemplo 3: Mostrar notificación de advertencia
   */
  testWarningNotification(): void {
    this.notificationService.warning(
      'Esta es una advertencia importante',
      'Advertencia',
      { timeOut: 4000 }
    );
  }

  /**
   * Ejemplo 4: Mostrar notificación de información
   */
  testInfoNotification(): void {
    this.notificationService.info(
      'Aquí va la información importante',
      'Información',
      { timeOut: 3000 }
    );
  }

  /**
   * Ejemplo 5: Petición exitosa (el interceptor mostrará automáticamente el mensaje)
   * Las peticiones GET no muestran mensaje automático
   * Las peticiones POST, PUT, PATCH, DELETE sí muestran mensaje automático
   */
  testApiCall(): void {
    // Ejemplo con GET (no mostrará notificación automática)
    this.webRequestService.get('api/users').subscribe({
      next: (response) => {
        console.log('Datos obtenidos:', response);
        // Aquí podrías mostrar una notificación manual si necesitas
        this.notificationService.success(
          'Datos cargados correctamente',
          'Éxito'
        );
      },
      error: (error) => {
        console.error('Error en petición GET:', error);
      },
    });

    // Ejemplo con POST (mostrará notificación automática)
    const payload = { name: 'John Doe', email: 'john@example.com' };
    this.webRequestService.post('api/users', payload).subscribe({
      next: (response) => {
        console.log('Usuario creado:', response);
        // El interceptor ya mostró el mensaje de éxito
      },
      error: (error) => {
        console.error('Error en petición POST:', error);
        // El interceptor ya mostró el mensaje de error
      },
    });
  }

  /**
   * Ejemplo 6: Petición con error (el interceptor manejará el error)
   */
  testApiError(): void {
    // Esto causará un error 404
    this.webRequestService.get('api/non-existent-endpoint').subscribe({
      next: (response) => {
        console.log('Respuesta:', response);
      },
      error: (error) => {
        console.error('Error capturado en componente:', error);
        // El interceptor ya mostró el mensaje de error
      },
    });
  }
}

/**
 * ============================================================
 * GUÍA DE IMPLEMENTACIÓN EN TUS SERVICIOS
 * ============================================================
 *
 * El interceptor funciona automáticamente para todas las peticiones HTTP.
 *
 * 1. PARA MENSAJES AUTOMÁTICOS:
 *    - Las peticiones POST, PUT, PATCH, DELETE mostrarán un mensaje de éxito automático
 *    - Los errores se mostrarán automáticamente con su código de estado
 *
 * 2. PARA MENSAJES PERSONALIZADOS EN TUS SERVICIOS:
 *
 *    import { NotificationService } from '../core/service/notification-service';
 *
 *    @Injectable({ providedIn: 'root' })
 *    export class UserService {
 *      constructor(
 *        private webRequest: WebRequestService,
 *        private notification: NotificationService
 *      ) {}
 *
 *      createUser(userData: any): void {
 *        this.webRequest.post('api/users', userData).subscribe({
 *          next: (response) => {
 *            this.notification.success(
 *              'Usuario creado correctamente',
 *              'Éxito'
 *            );
 *          },
 *          error: (error) => {
 *            this.notification.error(
 *              'No se pudo crear el usuario',
 *              'Error'
 *            );
 *          }
 *        });
 *      }
 *    }
 *
 * 3. CÓDIGOS DE ERROR MANEJADOS AUTOMÁTICAMENTE:
 *    - 400: Solicitud Inválida
 *    - 401: No Autorizado (sesión expirada)
 *    - 403: Acceso Denegado
 *    - 404: No Encontrado
 *    - 409: Conflicto
 *    - 500: Error del Servidor
 *    - 503: Servicio No Disponible
 *    - 0: Error de Conexión
 *
 * 4. POSICIONES DE NOTIFICACIÓN:
 *    - 'toast-top-left'
 *    - 'toast-top-center'
 *    - 'toast-top-right' (por defecto)
 *    - 'toast-bottom-left'
 *    - 'toast-bottom-center'
 *    - 'toast-bottom-right'
 */

