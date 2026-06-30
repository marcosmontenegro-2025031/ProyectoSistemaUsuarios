import { Usuarios } from "../data/usuarios";
import { Usuario } from "../models/usuario";
import { Cliente } from "../models/cliente";
import { Admin } from "../models/administrador";

export class UsuarioService {
    public registrar(usuario: Usuario): void {
        Usuarios.push(usuario);
    }

    public buscarPorId(id: number): Usuario | undefined {
        return Usuarios.find(u => u.getId() === id);
    }

    public obtenerPorTipo(tipo: "cliente" | "admin"): Usuario[] {
        return Usuarios.filter(u => 
            tipo === "cliente" ? u instanceof Cliente : u instanceof Admin
        );
    }
}
