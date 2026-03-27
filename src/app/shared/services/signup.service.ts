import { inject, Injectable } from '@angular/core';
import { RegistroUsuario } from '../interfaces/person.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TipoDocumentoGeneral } from '../interfaces/general-document-type.interface';

@Injectable({
    providedIn: 'root'
})
export class SignupService {

    private http = inject(HttpClient);

    signUpUser(usuario: RegistroUsuario){
        return this.http.post<RegistroUsuario>(`${environment.apiUrl}/auth/signup`, usuario);
    }

    getDocumentTypes(){
        return this.http.get<TipoDocumentoGeneral[]>(`${environment.apiUrl}/auth/document-type`);
    }
}