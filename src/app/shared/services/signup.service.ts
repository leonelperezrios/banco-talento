import { inject, Injectable } from '@angular/core';
import { Persona } from '../interfaces/persona.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TipoDocumentoGeneral } from '../interfaces/TipoDocumentoGeneral.interface';

@Injectable({
    providedIn: 'root'
})
export class SignupService {

    private http = inject(HttpClient);

    signUpUser(persona: Persona){
        return this.http.post<Persona>(`${environment.apiUrl}/auth/signup`, persona);
    }

    getDocumentTypes(){
        return this.http.get<TipoDocumentoGeneral[]>(`${environment.apiUrl}/auth/document-type`);
    }
}