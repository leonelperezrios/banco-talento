import { FormBuilder, Validators } from '@angular/forms';

export function createPersonInfoForm(fb: FormBuilder) {
  return fb.nonNullable.group({
    primerNombre: ['', [Validators.required, Validators.maxLength(80)]],
    segundoNombre: ['', [Validators.maxLength(80)]],
    primerApellido: ['', [Validators.required, Validators.maxLength(80)]],
    segundoApellido: ['', [Validators.maxLength(80)]],
    tipoDocumento: ['', [Validators.required, Validators.maxLength(30)]],
    numeroDocumento: ['', [Validators.required, Validators.maxLength(30)]],
    fechaExpedicion: [''],
    direccion: ['', [Validators.maxLength(180)]],
    ciudad: ['', [Validators.maxLength(80)]],
    telefono: ['', [Validators.maxLength(20)]],
  });
}

