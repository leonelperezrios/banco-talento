import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AspirantePersonalInfoService } from '../../data/aspirante-personal-info.service';
import { Persona, UpdatePersonalInfoRequest } from '../../models/persona.model';
import { Breadcrumb } from '../../../../../shared/components/common/breadcrumb/breadcrumb';
import { PersonPerfil } from '../../components/person-perfil/person-perfil';
import { PersonInfo } from '../../components/person-info/person-info';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [Breadcrumb, PersonPerfil, PersonInfo],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.css',
})
export class PersonalInfo implements OnInit {
  personalInfo = signal<Persona | null>(null);
  isLoading = signal(true);
  isEditing = signal(false);
  isSaving = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  constructor(private readonly personalInfoService: AspirantePersonalInfoService) {}

  async ngOnInit(): Promise<void> {
    await this.loadPersonalInfo();
  }

  async loadPersonalInfo(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const personId = 200907;
      const response = await firstValueFrom(this.personalInfoService.getPersonalInfoById(personId));
      console.log(response);
      this.personalInfo.set(response);
    } catch (error) {
      console.error('Error al consultar informacion personal:', error);
      this.errorMessage.set('No fue posible cargar tu informacion personal.');
    } finally {
      this.isLoading.set(false);
    }
  }

  onEdit(): void {
    this.successMessage.set(null);
    this.errorMessage.set(null);
    this.isEditing.set(true);
  }

  onCancel(): void {
    this.errorMessage.set(null);
    this.isEditing.set(false);
  }

  async onSaveContact(payload: UpdatePersonalInfoRequest): Promise<void> {
    this.isSaving.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    try {
      console.log(payload);
      const updated = await firstValueFrom(this.personalInfoService.updateContactInfo(payload));
      this.personalInfo.set(updated);
      this.isEditing.set(false);
      this.successMessage.set('Informacion personal actualizada correctamente.');
    } catch (error) {
      console.error('Error al actualizar informacion personal:', error);
      this.errorMessage.set('No fue posible guardar los cambios. Intenta nuevamente.');
    } finally {
      this.isSaving.set(false);
    }
  }

  async onSavePersoalInfo(payload: UpdatePersonalInfoRequest): Promise<void> {
    this.isSaving.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    try {
      console.log(payload);
      const updated = await firstValueFrom(this.personalInfoService.updatePersonalInfo(payload));
      this.personalInfo.set(updated);
      this.isEditing.set(false);
      this.successMessage.set('Informacion personal actualizada correctamente.');
    } catch (error) {
      console.error('Error al actualizar informacion personal:', error);
      this.errorMessage.set('No fue posible guardar los cambios. Intenta nuevamente.');
    } finally {
      this.isSaving.set(false);
    }
  }
}
