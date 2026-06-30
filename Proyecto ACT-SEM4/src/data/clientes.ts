import { Cliente } from "../models/clientes";
import { TipoCliente } from "../models/tipoCliente";

export const cliente: Cliente[] = [
    {
        id: 1,
        nombre: "Domingo",
        edad: 25,
        telefono: 47821041,
        email: "domingo@gmail.com",
        direccion: "3a Avenida 4-55, Zona 10, Ciudad de Guatemala, Guatemala, 01010",
        estadoCliente: "activo",
        tipoCliente: TipoCliente.INDEPENDIENTE
    }
]