import { inject, Injectable } from '@angular/core';
import { RegistroUsuario } from '../interfaces/person.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TipoDocumentoGeneral } from '../interfaces/general-document-type.interface';
import { WebRequestService } from '../../core/service/web-request-service';

@Injectable({
    providedIn: 'root'
})
export class SignupService {
  private http = inject(HttpClient);
  private readonly webRequestService = inject(WebRequestService);

  signUpUser(usuario: RegistroUsuario) {
    return this.webRequestService.post<RegistroUsuario>(`/auth/signup`, usuario);
  }

  getDocumentTypes() {
    return this.webRequestService.get<TipoDocumentoGeneral[]>(`/auth/document-type`);
  }
}
