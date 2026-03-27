import { CommonModule } from '@angular/common';
import { Component, effect, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Persona, UpdatePersonalInfoRequest } from '../../models/persona.model';
import { sileo } from 'sileo-angular';

@Component({
  selector: 'app-personal-info-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal-info-form.html',
  styleUrl: './personal-info-form.css',
})
export class PersonalInfoForm {
  personalInfo = input<Persona | null>(null);
  isEditing = input(false);
  isSaving = input(false);

  requestEdit = output<void>();
  requestCancel = output<void>();
  submitForm = output<UpdatePersonalInfoRequest>();

  readonly form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.nonNullable.group({
      nombres: ['', [Validators.required, Validators.maxLength(80)]],
      apellidos: ['', [Validators.required, Validators.maxLength(80)]],
      tipoDocumento: ['', [Validators.required, Validators.maxLength(30)]],
      numeroDocumento: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.maxLength(20)]],
      fechaNacimiento: [''],
      direccion: ['', [Validators.maxLength(180)]],
      ciudad: ['', [Validators.maxLength(80)]],
    });

    effect(() => {
      const info = this.personalInfo();
      if (info) {
        this.form.patchValue(info, { emitEvent: false });
      }
    });
  }

  onEdit(): void {
    // this.requestEdit.emit();

    sileo.action({
      title: 'File uploaded',
      description: 'Share it with your team?',
      button: {
        title: 'Share',
        onClick: () => console.log('Shared!'),
      },
    });
  }

  onCancel(): void {
    const info = this.personalInfo();
    if (info) {
      this.form.patchValue(info, { emitEvent: false });
    }

    this.requestCancel.emit();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitForm.emit(this.form.getRawValue());
  }
}



