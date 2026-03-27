import { Component, inject, signal } from '@angular/core';
import { AuthPageLayout } from '../../../shared/layout/auth-page-layout/auth-page-layout';
import { SignupForm } from '../../../shared/components/account/signup-form/signup-form';
import { SignupService } from '../../../shared/services/signup.service';
import { finalize } from 'rxjs';
import { Persona, RegistroUsuario } from '../../../shared/interfaces/person.interface';

@Component({
  selector: 'app-signup',
  imports: [AuthPageLayout, SignupForm],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup { 
  private readonly signupService = inject(SignupService);
  isLoading = signal(false);

  onSignUp(usuario: RegistroUsuario){
    const payload: RegistroUsuario = {
      ...usuario,
      idTipoDocumentoIdentidad: Number(usuario.idTipoDocumentoIdentidad),
    };

    this.isLoading.set(true);
    this.signupService.signUpUser(payload)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (resp) => {
          console.log(resp);
        },
        error: (err) => {
          console.error('Error', err)
        }
      });
  }

  

  
}
