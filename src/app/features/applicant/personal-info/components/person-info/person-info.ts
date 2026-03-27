import { Component, effect, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../../../../../shared/ui/icon/icon';
import { Persona, UpdatePersonalInfoRequest } from '../../models/persona.model';
import { Button } from '../../../../../shared/ui/button/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputField } from '../../../../../shared/components/form/input/input-field';
import { Label } from '../../../../../shared/components/form/label/label';
import { Modal } from '../../../../../shared/ui/modal/modal';
import { PERSON_INFO_CONTACT_FIELDS, PersonInfoControlKey } from './person-info.fields';
import { createPersonInfoForm } from './person-info-form.factory';
import { DatePicker } from '../../../../../shared/components/form/date-picker/date-picker';
import { firstValueFrom } from 'rxjs';
import { AspirantePersonalInfoService } from '../../data/aspirante-personal-info.service';
import { SignupService } from '../../../../../shared/services/signup.service';
import {
  type Option as SelectOption,
  Select,
} from '../../../../../shared/components/form/select/select';

@Component({
  selector: 'app-person-info',
  imports: [
    CommonModule,
    Icon,
    Button,
    InputField,
    Label,
    Modal,
    ReactiveFormsModule,
    DatePicker,
    Select,
  ],
  templateUrl: './person-info.html',
  styleUrl: './person-info.css',
})
export class PersonInfo {
  personalInfo = input<Persona | null>(null);
  requestUpdate = output<UpdatePersonalInfoRequest>();
  private readonly fb = inject(FormBuilder);
  private readonly signupService = inject(SignupService);
  isOpen = false;

  documentTypes = signal<SelectOption[]>([]);

  private readonly personalInfoService = inject(AspirantePersonalInfoService);

  readonly contactFields = PERSON_INFO_CONTACT_FIELDS;
  readonly form = createPersonInfoForm(this.fb);

  constructor() {
    effect(() => {
      this.resetForm(this.personalInfo());
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadDocumentType();
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

    const {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      telefono,
      tipoDocumento,
      numeroDocumento,
      fechaExpedicion,
      direccion,
      ciudad,
    } = this.form.getRawValue();

    const payload: UpdatePersonalInfoRequest = {
      id: info.id,
      primerNombre: primerNombre.trim(),
      segundoNombre: segundoNombre.trim(),
      primerApellido: primerApellido.trim(),
      segundoApellido: segundoApellido.trim(),
      telefono: telefono.trim(),
      tipoDocumento: tipoDocumento.trim(),
      numeroDocumento: numeroDocumento.trim(),
      fechaExpedicion: this.toDateOnly(fechaExpedicion),
      direccion: direccion.trim(),
      ciudad: ciudad.trim(),
    };

    this.requestUpdate.emit(payload);

    this.closeModal();
  }

  hasError(controlName: PersonInfoControlKey, errorCode: string): boolean {
    const control = this.form.controls[controlName];
    return control.touched && control.hasError(errorCode);
  }

  private resetForm(info: Persona | null): void {
    console.log(info);
    this.form.patchValue(
      {
        primerNombre: info?.personaNaturalGeneral?.primerNombre ?? '',
        segundoNombre: info?.personaNaturalGeneral?.segundoNombre ?? '',
        primerApellido: info?.personaNaturalGeneral?.primerApellido ?? '',
        segundoApellido: info?.personaNaturalGeneral?.segundoApellido ?? '',
        tipoDocumento: info?.tipoDocumento ?? '',
        numeroDocumento: info?.numeroDocumento ?? '',
        fechaExpedicion: this.toDateOnly(info?.fechaExpedicion),
        direccion: info?.direccion ?? '',
        ciudad: info?.ciudad ?? '',
        telefono: info?.telefono ?? '',
      },
      { emitEvent: false },
    );
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private toDateOnly(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    const datePart = value.split('T')[0];
    return /^\d{4}-\d{2}-\d{2}$/.test(datePart) ? datePart : '';
  }

  async loadDocumentType(): Promise<void> {
    // this.isLoading.set(true);
    // this.errorMessage.set(null);
    try {
      const response = await firstValueFrom(this.signupService.getDocumentTypes());
      this.documentTypes.set(
        response.map((type) => ({
          value: String(type.id),
          label: type.descripcion,
        })),
      );
    } catch (error) {
      console.error('Error al consultar informacion personal:', error);
      // this.errorMessage.set('No fue posible cargar tu informacion personal.');
    } finally {
      // this.isLoading.set(false);
    }
  }
}
