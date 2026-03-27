import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request-service';
import { NotificationService } from './notification-service';
import { Observable } from 'rxjs';

/**
 * Servicio para gestionar información de candidatos/aspirantes
 * Implementa la arquitectura basada en características con interceptores
 */
@Injectable({ providedIn: 'root' })
export class ApplicantService {
  constructor(
    private webRequest: WebRequestService,
    private notification: NotificationService
  ) {}

  /**
   * Obtener información personal del aspirante
   * GET - No muestra notificación de éxito automática
   */
  getPersonalInfo(applicantId: string): Observable<any> {
    return this.webRequest.get(`applicants/${applicantId}/personal-info`);
  }

  /**
   * Actualizar información personal del aspirante
   * PUT - Muestra notificación de éxito automática
   */
  updatePersonalInfo(
    applicantId: string,
    personalData: any
  ): Observable<any> {
    return this.webRequest.put(
      `applicants/${applicantId}/personal-info`,
      personalData
    );
  }

  /**
   * Crear nueva información personal
   * POST - Muestra notificación de éxito automática
   */
  createPersonalInfo(personalData: any): Observable<any> {
    return this.webRequest.post('applicants/personal-info', personalData);
  }

  /**
   * Obtener información de experiencia laboral
   * GET - No muestra notificación de éxito automática
   */
  getWorkExperience(applicantId: string): Observable<any> {
    return this.webRequest.get(
      `applicants/${applicantId}/work-experience`
    );
  }

  /**
   * Actualizar experiencia laboral
   * PUT - Muestra notificación de éxito automática
   */
  updateWorkExperience(
    applicantId: string,
    workData: any
  ): Observable<any> {
    return this.webRequest.put(
      `applicants/${applicantId}/work-experience`,
      workData
    );
  }

  /**
   * Agregar nueva experiencia laboral
   * POST - Muestra notificación de éxito automática
   */
  addWorkExperience(
    applicantId: string,
    workData: any
  ): Observable<any> {
    return this.webRequest.post(
      `applicants/${applicantId}/work-experience`,
      workData
    );
  }

  /**
   * Eliminar experiencia laboral
   * DELETE - Muestra notificación de éxito automática
   */
  deleteWorkExperience(
    applicantId: string,
    experienceId: string
  ): Observable<any> {
    return this.webRequest.delete(
      `applicants/${applicantId}/work-experience/${experienceId}`
    );
  }

  /**
   * Obtener información educativa
   * GET - No muestra notificación de éxito automática
   */
  getEducationInfo(applicantId: string): Observable<any> {
    return this.webRequest.get(
      `applicants/${applicantId}/education`
    );
  }

  /**
   * Actualizar información educativa
   * PUT - Muestra notificación de éxito automática
   */
  updateEducationInfo(
    applicantId: string,
    educationData: any
  ): Observable<any> {
    return this.webRequest.put(
      `applicants/${applicantId}/education`,
      educationData
    );
  }

  /**
   * Agregar nueva información educativa
   * POST - Muestra notificación de éxito automática
   */
  addEducationInfo(
    applicantId: string,
    educationData: any
  ): Observable<any> {
    return this.webRequest.post(
      `applicants/${applicantId}/education`,
      educationData
    );
  }

  /**
   * Eliminar información educativa
   * DELETE - Muestra notificación de éxito automática
   */
  deleteEducationInfo(
    applicantId: string,
    educationId: string
  ): Observable<any> {
    return this.webRequest.delete(
      `applicants/${applicantId}/education/${educationId}`
    );
  }

  /**
   * Obtener convocatorias disponibles
   * GET - No muestra notificación de éxito automática
   */
  getConvocations(): Observable<any> {
    return this.webRequest.get('convocations');
  }

  /**
   * Obtener detalles de una convocatoria
   * GET - No muestra notificación de éxito automática
   */
  getConvocationDetails(convocationId: string): Observable<any> {
    return this.webRequest.get(`convocations/${convocationId}`);
  }

  /**
   * Aplicar a una convocatoria
   * POST - Muestra notificación de éxito automática
   */
  applyToConvocation(
    applicantId: string,
    convocationId: string
  ): Observable<any> {
    return this.webRequest.post(
      `applicants/${applicantId}/apply`,
      { convocationId }
    );
  }

  /**
   * Obtener evaluaciones de hojas de vida
   * GET - No muestra notificación de éxito automática
   */
  getEvaluations(applicantId: string): Observable<any> {
    return this.webRequest.get(
      `applicants/${applicantId}/evaluations`
    );
  }

  /**
   * Obtener notificaciones del aspirante
   * GET - No muestra notificación de éxito automática
   */
  getNotifications(applicantId: string): Observable<any> {
    return this.webRequest.get(
      `applicants/${applicantId}/notifications`
    );
  }

  /**
   * Marcar notificación como leída
   * PATCH - Muestra notificación de éxito automática
   */
  markNotificationAsRead(
    applicantId: string,
    notificationId: string
  ): Observable<any> {
    return this.webRequest.patch(
      `applicants/${applicantId}/notifications/${notificationId}/read`,
      {}
    );
  }

  /**
   * Obtener reporte del aspirante
   * GET - No muestra notificación de éxito automática
   */
  getReport(applicantId: string): Observable<any> {
    return this.webRequest.get(
      `applicants/${applicantId}/report`
    );
  }

  /**
   * Subir foto de perfil
   * POST - Muestra notificación de éxito automática
   * Con notificación adicional de carga
   */
  uploadProfilePhoto(
    applicantId: string,
    file: File
  ): Observable<any> {
    this.notification.info(
      'Cargando foto de perfil...',
      'Por favor espera'
    );

    const formData = new FormData();
    formData.append('photo', file);

    return this.webRequest.post(
      `applicants/${applicantId}/photo`,
      formData
    );
  }

  /**
   * Descargar hoja de vida en PDF
   * GET - No muestra notificación de éxito automática
   */
  downloadCurriculumPDF(applicantId: string): Observable<any> {
    return this.webRequest.getObserve(
      `applicants/${applicantId}/curriculum/download`
    );
  }
}

