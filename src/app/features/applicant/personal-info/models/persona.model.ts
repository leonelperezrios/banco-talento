import { PersonaNaturalGeneral } from './personaNaturalGeneral.model';

export interface Persona {
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  email: string;
  fechaNacimiento: string;
  ciudad: string;

  foto: string;
  id: string;
  tipoPersona: string;
  direccion: string;
  mail: string;
  telefonoCelular:string;
  telefono: string;
  idTipoDocumentoIdentidad: string;
  documentoIdentidad: string;
  lugarExpedicion: string;
  fechaExpedicion: string;
  tipoDocumentoIdentidadNombre: string
  tipoDocumentoIdentidadAbreviatura: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  sexo: string;
  emailInstitucional: string;
  personaNaturalGeneral: PersonaNaturalGeneral;
}

export type UpdatePersonalInfoRequest = Partial<Persona>;

