import { Component, inject, signal } from '@angular/core';
import { AuthPageLayout } from '../../../shared/layout/auth-page-layout/auth-page-layout';
import { SignupForm } from '../../../shared/components/account/signup-form/signup-form';
import { SignupService } from '../../../shared/services/signup.service';
import { finalize } from 'rxjs';
import { Persona } from '../../../shared/interfaces/persona.interface';

@Component({
  selector: 'app-signup',
  imports: [AuthPageLayout, SignupForm],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup { 
  private readonly signupService = inject(SignupService);
  isLoading = signal(false);

  onSignUp(persona: Persona){
    this.isLoading.set(true);
    this.signupService.signUpUser(persona)
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
