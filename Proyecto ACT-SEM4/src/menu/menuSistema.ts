import { rl } from "../utils/readline";
import { UsuarioService } from "../services/usuarioService";
import { Cliente } from "../models/cliente";
import { Admin } from "../models/administrador";

const servicio = new UsuarioService();

function dibujarTarjetaUsuario(u: any, tipo: "cliente" | "admin"): void {
    console.log("  ╔═════════════════════════════════════════════╗");
    console.log(`  ║  PERFIL DE ${tipo.toUpperCase().padEnd(33)}║`);
    console.log("  ╠═════════════════════════════════════════════╣");
    console.log(`  ║  ID: ${u.getId().toString().padEnd(39)}║`);
    console.log(`  ║  Nombre: ${u.nombre.padEnd(35)}║`);
    console.log(`  ║  Email: ${u.email.padEnd(36)}║`);
    
    if (tipo === "cliente") {
        console.log(`  ║  Telefono: ${u.telefono.padEnd(33)}║`);
    } else {
        console.log(`  ║  Rol: ${u.rol.padEnd(38)}║`);
    }
    console.log("  ╚═════════════════════════════════════════════╝");
}

export function menu(): void {
    console.log("\n========== SISTEMA DE USUARIOS ==========");
    console.log("1. Menú Clientes");
    console.log("2. Menú Administradores");
    console.log("3. Salir");

    rl.question("\nSeleccione una opción: ", (option: string) => {
        switch (option.trim()) {
            case "1":
                menuClientes();
                break;
            case "2":
                menuAdmins();
                break;
            case "3":
                console.log("\n¡Hasta luego!");
                rl.close();
                break;
            default:
                console.log("\nOpción no válida. Intente de nuevo.");
                menu();
                break;
        }
    });
}

function menuClientes(): void {
    console.log("\n========== MENÚ CLIENTES ==========");
    console.log("1. Listar clientes");
    console.log("2. Buscar cliente por ID");
    console.log("3. Crear Cliente");
    console.log("4. Regresar");

    rl.question("\nSeleccione una opción: ", (option: string) => {
        switch (option.trim()) {
            case "1":
                console.log("\n=================== LISTADO DE CLIENTES ===================");
                const clientes = servicio.obtenerPorTipo("cliente");
                if (clientes.length > 0) {
                    clientes.forEach((c) => {
                        dibujarTarjetaUsuario(c, "cliente");
                        console.log("");
                    });
                } else {
                    console.log("No hay clientes registrados.");
                }
                menuClientes();
                break;

            case "2":
                rl.question("Ingrese ID a buscar: ", (id: string) => {
                    const c = servicio.buscarPorId(Number(id));
                    if (c && c instanceof Cliente) {
                        console.log("\n=================== RESULTADO DE BÚSQUEDA ===================");
                        dibujarTarjetaUsuario(c, "cliente");
                    } else {
                        console.log("\nCliente no encontrado.");
                    }
                    menuClientes();
                });
                break;

            case "3":
                console.log("\n--- Registrar Nuevo Cliente ---");
                rl.question("ID: ", (id: string) => {
                    if (servicio.buscarPorId(Number(id))) {
                        console.log("\nError: Ya existe un usuario con ese ID.");
                        menuClientes();
                        return;
                    }
                    rl.question("Nombre: ", (nombre: string) => {
                        rl.question("Email: ", (email: string) => {
                            rl.question("Teléfono: ", (telefono: string) => {
                                const nuevoCliente = new Cliente(
                                    Number(id), 
                                    nombre.trim(), 
                                    email.trim(), 
                                    telefono.trim()
                                );
                                servicio.registrar(nuevoCliente);
                                console.log("\nCliente creado con éxito.");
                                menuClientes();
                            });
                        });
                    });
                });
                break;

            case "4":
                menu();
                break;

            default:
                console.log("\nOpción no válida.");
                menuClientes();
                break;
        }
    });
}

function menuAdmins(): void {
    console.log("\n========== MENÚ ADMINISTRADORES ==========");
    console.log("1. Listar administradores");
    console.log("2. Buscar administrador por ID");
    console.log("3. Crear Administrador");
    console.log("4. Regresar");

    rl.question("\nSeleccione una opción: ", (option: string) => {
        switch (option.trim()) {
            case "1":
                console.log("\n=================== LISTADO DE ADMINISTRADORES ===================");
                const admins = servicio.obtenerPorTipo("admin");
                if (admins.length > 0) {
                    admins.forEach((a) => {
                        dibujarTarjetaUsuario(a, "admin");
                        console.log("");
                    });
                } else {
                    console.log("No hay administradores registrados.");
                }
                menuAdmins();
                break;

            case "2":
                rl.question("Ingrese ID a buscar: ", (id: string) => {
                    const a = servicio.buscarPorId(Number(id));
                    if (a && a instanceof Admin) {
                        console.log("\n=================== RESULTADO DE BÚSQUEDA ===================");
                        dibujarTarjetaUsuario(a, "admin");
                    } else {
                        console.log("\nAdministrador no encontrado.");
                    }
                    menuAdmins();
                });
                break;

            case "3":
                console.log("\n--- Registrar Nuevo Administrador ---");
                rl.question("ID: ", (id: string) => {
                    if (servicio.buscarPorId(Number(id))) {
                        console.log("\nError: Ya existe un usuario con ese ID.");
                        menuAdmins();
                        return;
                    }
                    rl.question("Nombre: ", (nombre: string) => {
                        rl.question("Email: ", (email: string) => {
                            rl.question("Rol: ", (rol: string) => {
                                const nuevoAdmin = new Admin(
                                    Number(id), 
                                    nombre.trim(), 
                                    email.trim(), 
                                    rol.trim()
                                );
                                servicio.registrar(nuevoAdmin);
                                console.log("\nAdministrador creado con éxito.");
                                menuAdmins();
                            });
                        });
                    });
                });
                break;

            case "4":
                menu();
                break;

            default:
                console.log("\nOpción no válida.");
                menuAdmins();
                break;
        }
    });
}
