export abstract class Usuario {
    constructor(
        protected id: number,
        protected nombre: string,
        protected email: string
    ) {}

    public getId(): number {
        return this.id;
    }

    public abstract obtenerInfo(): string;
}
