import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from '../service/auth-service';
import { ToastService } from '../service/toastService';
import { sileo } from 'sileo-angular';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.handleSuccess(event, request);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => error);
      }),
    );
  }

  private handleSuccess(response: HttpResponse<any>, request: HttpRequest<any>): void {
    if (request.method === 'GET') {
      return;
    }

    let successMessage = response.body?.message ?? 'Operacion completada exitosamente';
    let successTitle = 'Exito';
    const key = `${request.method}:${response.status}`;

    switch (key) {
      case 'POST:201':
        successTitle = 'Registro Creado';
        successMessage = response.body?.message ?? 'El registro se ha creado con exito.';
        break;
      case 'PUT:200':
      case 'PUT:201':
      case 'PATCH:200':
      case 'PATCH:201':
        successTitle = 'Registro Actualizado';
        successMessage = response.body?.message ?? 'El registro se ha actualizado con exito.';
        break;
      case 'DELETE:200':
      case 'DELETE:204':
        successTitle = 'Registro Eliminado';
        successMessage = response.body?.message ?? 'El registro se ha eliminado con exito.';
        break;
      default:
        if (response.status < 200 || response.status >= 300) {
          return;
        }
    }

    // sileo.success({
    //   title: successTitle,
    //   description: successMessage
    // });
    this.toastService.show(successMessage, 'success', successTitle);
  }

  private handleError(error: HttpErrorResponse): void {
    let errorMessage = 'Ha ocurrido un error en la solicitud';
    let errorTitle = 'Error';

    // Obtener mensaje del servidor si está disponible
    if (error.error) {
      if (typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error.message) {
        errorMessage = error.error.message;
      } else if (error.error.error) {
        errorMessage = error.error.error;
      }
    }

    // Manejo específico por código de estado
    switch (error.status) {
      case 400:
        errorTitle = 'Solicitud Inválida';
        errorMessage = error.error?.message || 'La solicitud contiene datos inválidos';
        break;
      case 401:
        errorTitle = 'No Autorizado';
        errorMessage = 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente';
        this.authService.logout();
        break;
      case 403:
        errorTitle = 'Acceso Denegado';
        errorMessage = 'No tienes permisos para realizar esta acción';
        break;
      case 404:
        errorTitle = 'No Encontrado';
        errorMessage = 'El recurso solicitado no existe';
        break;
      case 409:
        errorTitle = 'Conflicto';
        errorMessage = error.error?.message || 'El recurso ya existe o hay un conflicto';
        break;
      case 500:
        errorTitle = 'Error del Servidor';
        errorMessage = 'Ha ocurrido un error en el servidor. Intenta más tarde';
        break;
      case 503:
        errorTitle = 'Servicio No Disponible';
        errorMessage = 'El servicio no está disponible. Intenta más tarde';
        break;
      case 0:
        errorTitle = 'Error de Conexión';
        errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión a internet';
        break;
      default:
        errorMessage =
          error.message || `Error ${error.status}: ${error.statusText || 'Desconocido'}`;
    }

    // sileo.error({
    //   title: errorTitle,
    //   description: errorMessage
    // })

    this.toastService.show(errorMessage, 'error', errorTitle, 5000);

    console.error('HTTP Error:', {
      status: error.status,
      message: errorMessage,
      url: error.url,
      error: error.error,
    });
  }
}
