import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../../../core/config/app-config.token';
import { AppConfig } from '../../../../core/config/app-config';
import { WebRequestService } from '../../../../core/service/web-request-service';
import { Persona, UpdatePersonalInfoRequest } from '../models/persona.model';

@Injectable({
  providedIn: 'root',
})
export class AspirantePersonalInfoService {
  private readonly webRequestService = inject(WebRequestService);

  private readonly endpoint = '/persona-general';

  getPersonalInfo(): Observable<Persona> {
    return this.webRequestService.get<Persona>(this.endpoint);
  }

  getPersonalInfoById(idPerson: number): Observable<Persona> {
    return this.webRequestService.get<Persona>(`${this.endpoint}/${idPerson}`);
  }

  updateContactInfo(payload: UpdatePersonalInfoRequest): Observable<Persona> {
    return this.webRequestService.patch<Persona>(
      `${this.endpoint}/${payload.id}/contacto`,
      payload,
    );
  }

  updatePersonalInfo(payload: UpdatePersonalInfoRequest): Observable<Persona> {
    return this.webRequestService.patch<Persona>(
      `${this.endpoint}/${payload.id}/personal-info`,
      payload,
    );
  }
}
