import { Component, effect, inject, input, output } from '@angular/core';
import { Persona, UpdatePersonalInfoRequest } from '../../models/persona.model';
import { CommonModule } from '@angular/common';
import { Icon } from '../../../../../shared/ui/icon/icon';
import { ImageFallback } from '../../../../../core/directives/image-fallback';
import { InputField } from '../../../../../shared/components/form/input/input-field';
import { Modal } from '../../../../../shared/ui/modal/modal';
import { Button } from '../../../../../shared/ui/button/button';
import { Label } from '../../../../../shared/components/form/label/label';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type Key = 'telefonoCelular' | 'mail';

interface ContactFieldConfig {
  key: Key;
  label: string;
  type: string;
  name: string;
  payloadKeys: Array<keyof UpdatePersonalInfoRequest>;
}

@Component({
  selector: 'app-person-perfil',
  imports: [CommonModule, Icon, ImageFallback, InputField, Modal, Button, ReactiveFormsModule, Label],
  templateUrl: './person-perfil.html',
  styleUrl: './person-perfil.css',
})
export class PersonPerfil {
  personalInfo = input<Persona | null>(null);
  requestUpdate = output<UpdatePersonalInfoRequest>();
  private readonly fb = inject(FormBuilder);

  readonly contactFields: ContactFieldConfig[] = [
    {
      key: 'telefonoCelular',
      label: 'Telefono',
      type: 'text',
      name: 'telefonoCelular',
      payloadKeys: ['telefonoCelular', 'telefono'],
    },
    {
      key: 'mail',
      label: 'Correo Electronico',
      type: 'email',
      name: 'mail',
      payloadKeys: ['mail', 'email'],
    },
  ];

  readonly form = this.fb.nonNullable.group({
    telefonoCelular: ['', [Validators.required, Validators.maxLength(20)]],
    mail: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
  });

  isOpen = false;

  constructor() {
    effect(() => {
      this.resetForm(this.personalInfo());
    });
  }

  openModal() {
    this.resetForm(this.personalInfo());
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  handleSave() {
    const info = this.personalInfo();
    if (!info || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { telefonoCelular, mail } = this.form.getRawValue();

    const payload: UpdatePersonalInfoRequest = {
      id: info.id,
      telefonoCelular: telefonoCelular.trim(),
      mail: mail.trim()
    };

    this.requestUpdate.emit(payload);

    this.closeModal();
  }

  hasError(controlName: Key, errorCode: string): boolean {
    const control = this.form.controls[controlName];
    return control.touched && control.hasError(errorCode);
  }

  private resetForm(info: Persona | null): void {
    this.form.patchValue(
      {
        telefonoCelular: info?.telefonoCelular ?? '',
        mail: info?.mail ?? '',
      },
      { emitEvent: false },
    );
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
