import { cliente } from "../data/clientes";
import { Cliente } from "../models/clientes";

export function listarCliente(): Cliente[] {
    return cliente;
}

export function buscarClientePorId(id: number): Cliente | null {
    return cliente.find(u => u.id === id) || null;
}

export function crearCliente(nuevoCliente: Cliente): Cliente {
    cliente.push(nuevoCliente);
    return nuevoCliente;
}

export function editarCliente(clienteModificado: Cliente): boolean {
    const i = cliente.findIndex(u => u.id === clienteModificado.id);
    if (i !== -1) {
        cliente[i] = clienteModificado;
        return true;
    }
    return false;
}

export function eliminar(id: number): boolean {
    const i = cliente.findIndex(u => u.id === id);
    if (i !== -1) {
        cliente.splice(i, 1);
        return true;
    }
    return false;
}