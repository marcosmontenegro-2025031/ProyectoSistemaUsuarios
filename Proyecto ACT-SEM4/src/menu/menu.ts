import { rl } from "../utils/readline";
import { listarCliente, buscarClientePorId, eliminar, editarCliente, crearCliente } from "../services/clienteService"; 
import { Estado } from "../models/estadoCliente";
import { TipoCliente } from "../models/tipoCliente";


function dibujarTarjetaCliente(c: any): void {
    console.log("  ╔═════════════════════════════════════════════╗");
    console.log("  ║  PERFIL DE CLIENTE                          ║");
    console.log("  ╠═════════════════════════════════════════════╣");
    console.log(`  ║  ID: ${c.id.toString().padEnd(39)}║`);
    console.log(`  ║  Nombre: ${c.nombre.padEnd(35)}║`);
    console.log(`  ║  Edad: ${(c.edad + " anos").padEnd(37)}║`);
    console.log(`  ║  Telefono: ${c.telefono.toString().padEnd(33)}║`);
    console.log(`  ║  Email: ${c.email.padEnd(36)}║`);
    console.log(`  ║  Estado: ${c.estadoCliente.toUpperCase().padEnd(35)}║`);
    console.log(`  ║  Tipo: ${c.tipoCliente.padEnd(37)}║`);
    console.log("  ╠═════════════════════════════════════════════╣");
    const dirCorta = (c.direccion || "").substring(0, 38);
    console.log(`  ║  Dir: ${dirCorta.padEnd(38)}║`);
    console.log("  ╚═════════════════════════════════════════════╝");
}

function menuClientes(): void {
    console.log("\n========== MENÚ CLIENTES ==========");
    console.log("1. Listar clientes");
    console.log("2. Buscar cliente por ID");
    console.log("3. Crear Cliente");
    console.log("4. Editar Cliente");
    console.log("5. Eliminar Cliente");
    console.log("6. Regresar");

    rl.question("\nSeleccione una opción: ", (option: string) => {

        switch (option.trim()) {

            case "1":
                console.log("\n=================== LISTADO DE CLIENTES ===================");

                const clientesJson = listarCliente();

                if (clientesJson.length > 0) {
                    clientesJson.forEach((c) => {
                        dibujarTarjetaCliente(c);
                        console.log("");
                    });
                } else {
                    console.log("No hay clientes registrados.");
                }

                menuClientes();
                break;

            case "2":
                rl.question("Ingrese ID a buscar: ", (id: string) => {

                    const c = buscarClientePorId(Number(id));

                    if (c) {
                        console.log("\n=================== RESULTADO DE BÚSQUEDA ===================");
                        dibujarTarjetaCliente(c);
                    } else {
                        console.log("\nCliente no encontrado.");
                    }

                    menuClientes();
                });

                break;

            case "3":
                console.log("\n--- Registrar Nuevo Cliente ---");

                rl.question("ID: ", (id: string) => {
                    rl.question("Nombre: ", (nombre: string) => {
                        rl.question("Edad: ", (edad: string) => {
                            rl.question("Teléfono: ", (telefono: string) => {
                                rl.question("Email: ", (email: string) => {
                                    rl.question("Dirección: ", (direccion: string) => {
                                        rl.question("Estado: ", (estado: string) => {
                                            rl.question("Tipo Cliente: ", (tipo: string) => {

                                                crearCliente({
                                                    id: Number(id),
                                                    nombre: nombre,
                                                    edad: Number(edad),
                                                    telefono: Number(telefono),
                                                    email: email,
                                                    direccion: direccion,
                                                    estadoCliente: estado as Estado,
                                                    tipoCliente: tipo as TipoCliente
                                                });

                                                console.log("\nCliente creado con éxito.");
                                                menuClientes();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });

                break;

            case "4":
                console.log("\n--- Editar Cliente Existente ---");

                rl.question("Ingrese el ID del cliente a editar: ", (id: string) => {

                    const existente = buscarClientePorId(Number(id));

                    if (!existente) {
                        console.log("\nEl cliente no existe.");
                        menuClientes();
                        return;
                    }

                    rl.question(`Nuevo nombre (${existente.nombre}): `, (nombre: string) => {
                        rl.question(`Nueva edad (${existente.edad}): `, (edad: string) => {
                            rl.question(`Nuevo teléfono (${existente.telefono}): `, (telefono: string) => {
                                rl.question(`Nuevo email (${existente.email}): `, (email: string) => {
                                    rl.question(`Nueva dirección (${existente.direccion}): `, (direccion: string) => {
                                        rl.question(`Nuevo estado (${existente.estadoCliente}): `, (estado: string) => {
                                            rl.question(`Nuevo tipo (${existente.tipoCliente}): `, (tipo: string) => {

                                                const editado = editarCliente({
                                                    id: Number(id),
                                                    nombre: nombre || existente.nombre,
                                                    edad: edad ? Number(edad) : existente.edad,
                                                    telefono: telefono ? Number(telefono) : existente.telefono,
                                                    email: email || existente.email,
                                                    direccion: direccion || existente.direccion,
                                                    estadoCliente: (estado as Estado) || existente.estadoCliente,
                                                    tipoCliente: (tipo as TipoCliente) || existente.tipoCliente
                                                });

                                                if (editado) {
                                                    console.log("\nCliente editado con éxito.");
                                                } else {
                                                    console.log("\nError al editar.");
                                                }

                                                menuClientes();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });

                break;

            case "5":
                rl.question("Ingrese ID a eliminar: ", (id: string) => {

                    const eliminado = eliminar(Number(id));

                    if (eliminado) {
                        console.log("\nCliente eliminado con éxito.");
                    } else {
                        console.log("\nNo se encontró ningún cliente con ese ID.");
                    }

                    menuClientes();
                });

                break;

            case "6":
                menu();
                break;

            default:
                console.log("\nOpción no válida. Intente de nuevo.");
                menuClientes();
        }
    });
}
