import { UpdatePersonalInfoRequest } from '../../models/persona.model';

export type PersonInfoControlKey =
  | 'primerNombre'
  | 'segundoNombre'
  | 'primerApellido'
  | 'segundoApellido'
  | 'tipoDocumento'
  | 'numeroDocumento'
  | 'fechaExpedicion'
  | 'direccion'
  | 'ciudad'
  | 'telefono';

export interface PersonInfoFieldConfig {
  key: PersonInfoControlKey;
  label: string;
  type: string;
  name: string;
  payloadKeys: Array<keyof UpdatePersonalInfoRequest>;
  class?: string;
}

export const PERSON_INFO_CONTACT_FIELDS: PersonInfoFieldConfig[] = [
  {
    key: 'primerNombre',
    label: 'Primer Nombre',
    type: 'text',
    name: 'primerNombre',
    payloadKeys: ['primerNombre'],
    class: 'lg:col-span-1',
  },
  {
    key: 'segundoNombre',
    label: 'Segundo Nombre',
    type: 'text',
    name: 'segundoNombre',
    payloadKeys: ['segundoNombre'],
    class: 'lg:col-span-1',
  },
  {
    key: 'primerApellido',
    label: 'Primer Apellido',
    type: 'text',
    name: 'primerApellido',
    payloadKeys: ['primerApellido'],
    class: 'lg:col-span-1',
  },
  {
    key: 'segundoApellido',
    label: 'Segundo Apellido',
    type: 'text',
    name: 'segundoApellido',
    payloadKeys: ['segundoApellido'],
    class: 'lg:col-span-1',
  },
  {
    key: 'tipoDocumento',
    label: 'Tipo Documento',
    type: 'select',
    name: 'tipoDocumento',
    payloadKeys: ['tipoDocumento'],
    class: 'lg:col-span-1',
  },
  {
    key: 'numeroDocumento',
    label: 'Numero Documento',
    type: 'text',
    name: 'numeroDocumento',
    payloadKeys: ['numeroDocumento'],
    class: 'lg:col-span-1',
  },
  {
    key: 'fechaExpedicion',
    label: 'Fecha de Expedicion',
    type: 'date',
    name: 'fechaExpedicion',
    payloadKeys: ['fechaExpedicion'],
  },
  // {
  //   key: 'direccion',
  //   label: 'Direccion',
  //   type: 'text',
  //   name: 'direccion',
  //   payloadKeys: ['direccion'],
  // },
  // {
  //   key: 'ciudad',
  //   label: 'Ciudad',
  //   type: 'text',
  //   name: 'ciudad',
  //   payloadKeys: ['ciudad'],
  // },
  {
    key: 'telefono',
    label: 'Telefono',
    type: 'text',
    name: 'telefono',
    payloadKeys: ['telefono'],
  },
];

