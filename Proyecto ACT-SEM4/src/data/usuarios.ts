import { Usuario } from "../models/usuario";
import { Cliente } from "../models/cliente";
import { Admin } from "../models/administrador";

export const Usuarios: Usuario[] = [
    new Cliente(1, "Ana Gomez", "ana@mail.com", "555-1234"),
    new Cliente(2, "Luis Perez", "luis@mail.com", "555-5678"),
    new Admin(3, "Carlos Ruiz", "carlos@admin.com", "SuperAdmin"),
    new Admin(4, "Maria Lopez", "maria@admin.com", "Soporte")
];
