import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputField } from '../../form/input/input-field';
import { Label } from '../../form/label/label';
import { Button } from '../../../ui/button/button';
import { Persona } from '../../../interfaces/persona.interface';
import { Select } from '../../form/select/select';
import { SignupService } from '../../../services/signup.service';
import type { Option as SelectOption } from '../../form/select/select';

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule, InputField, Label, Button, Select],
  templateUrl: './signup-form.html',
})
export class SignupForm {
  private readonly fb = inject(FormBuilder);
  private readonly signupService = inject(SignupService);

  showPassword = signal(false);
  isLoading = input(false);


  documentTypes = signal<SelectOption[]>([]);


  readonly form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    secondName: [''],
    middleName: ['', Validators.required],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    user: ['', [Validators.required]],
    documentType: ['', Validators.required],
    documentNumber: ['', Validators.required],
  });

  submitForm = output<Persona>();

  ngOnInit(){ 
    this.getDocumentTypes(); 
  }

  togglePasswordVisibility() {
    this.showPassword.update((value) => !value);
  }


  onSignUp(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const persona: Persona = this.form.getRawValue();
    this.submitForm.emit(persona);
    console.log('signup', persona);
  }

  getDocumentTypes(){
    this.signupService.getDocumentTypes().subscribe({
      next: (lista) => {
        this.documentTypes.set(
          lista.map((type) => ({
            value: String(type.id),
            label: type.nombre,
          }))
        );
      },
    });
  }

}
