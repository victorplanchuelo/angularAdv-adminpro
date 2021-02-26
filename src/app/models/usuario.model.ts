export class Usuario {
  constructor(
    public nombre: string,
    public apellido1: string,
    public email: string,
    public apellido2?: string,
    public password?: string,
    public role?: string,
    public google?: boolean,
    public img?: string,
    public uid?: string,
  ) {}
}
