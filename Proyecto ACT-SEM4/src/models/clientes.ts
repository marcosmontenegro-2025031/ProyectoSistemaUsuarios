import { Estado } from "./estadoCliente";
import { TipoCliente } from "./tipoCliente";

export interface Cliente{
    id: number;
    nombre: string;
    edad: number;
    telefono: number;
    email: string;
    direccion: string;
    estadoCliente: Estado;
    tipoCliente: TipoCliente;
}
