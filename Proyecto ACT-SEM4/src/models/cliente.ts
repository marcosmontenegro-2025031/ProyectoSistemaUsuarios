import { Usuario } from "./usuario";

export class Cliente extends Usuario {
    constructor(
        id: number,
        nombre: string,
        email: string,
        private telefono: string
    ) {
        super(id, nombre, email);
    }

    public obtenerInfo(): string {
        return `[Cliente] ID: ${this.id} | Nombre: ${this.nombre} | Email: ${this.email} | Tel: ${this.telefono}`;
    }
}
