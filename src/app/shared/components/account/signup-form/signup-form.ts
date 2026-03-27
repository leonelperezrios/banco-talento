import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputField } from '../../form/input/input-field';
import { Label } from '../../form/label/label';
import { Button } from '../../../ui/button/button';
import { Persona, RegistroUsuario } from '../../../interfaces/person.interface';
import { Select } from '../../form/select/select';
import { SignupService } from '../../../services/signup.service';
import type { Option as SelectOption } from '../../form/select/select';
import { Icon } from '../../../ui/icon/icon';
@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule, InputField, Label, Button, Select, Icon],
  templateUrl: './signup-form.html',
})
export class SignupForm {
  private readonly fb = inject(FormBuilder);
  private readonly signupService = inject(SignupService);

  showPassword = signal(false);
  isLoading = input(false);


  documentTypes = signal<SelectOption[]>([]);

  genderOptions = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
  ];


  readonly formSignup = this.fb.nonNullable.group({
    primerNombre: ['', Validators.required],
    segundoNombre: [''],
    primerApellido: ['', Validators.required],
    segundoApellido: [''],
    mail: ['', [Validators.required, Validators.email]],
    idTipoDocumentoIdentidad: [0, Validators.required],
    documentoIdentidad: ['', Validators.required],
    sexo: ['', Validators.required],
    usuario: ['', [Validators.required]],
    contrasena: ['',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
      ],
    ],
    tipoPersona: '1',
  });

  submitForm = output<RegistroUsuario>();

  ngOnInit(){
    this.getDocumentTypes();
  }

  togglePasswordVisibility() {
    this.showPassword.update((value) => !value);
  }


  onSignUp(){
    if (this.formSignup.invalid) {
      this.formSignup.markAllAsTouched();
      return;
    }
    const registroUsuario: RegistroUsuario = this.formSignup.getRawValue();
    this.submitForm.emit(registroUsuario);
  }

  getDocumentTypes(){
    this.signupService.getDocumentTypes().subscribe({
      next: (lista) => {
        this.documentTypes.set(
          lista.map((type) => ({
            value: String(type.id),
            label: type.descripcion,
          }))
        );
      },
    });
  }

  passwordControl(){
    return this.formSignup.get('contrasena');
  }



}
