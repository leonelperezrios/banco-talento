export interface Persona {
    firstName: string;
    secondName: string;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
    user: string;
    documentType: string;
    documentNumber: string;
}

export interface RegistroUsuario {
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    tipoPersona: string;
    mail: string;
    sexo: string;
    idTipoDocumentoIdentidad: number;
    documentoIdentidad: string;
    usuario: string;
    contrasena: string;
}