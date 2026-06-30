import { Usuario } from "./usuario";

export class Admin extends Usuario {
    constructor(
        id: number,
        nombre: string,
        email: string,
        private rol: string
    ) {
        super(id, nombre, email);
    }

    public obtenerInfo(): string {
        return `[Admin] ID: ${this.id} | Nombre: ${this.nombre} | Email: ${this.email} | Rol: ${this.rol}`;
    }
}
