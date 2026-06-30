# Sistema de Gestión de Usuarios (TypeScript)

Este proyecto es una simulación de un sistema de usuarios (Clientes y Administradores) que aplica los pilares fundamentales de la Programación Orientada a Objetos (POO) y una arquitectura limpia estructurada por capas (empaquetado).

La interfaz interactúa completamente por medio de la consola utilizando menús anidados basados en callbacks nativos, garantizando un flujo estructurado y libre de duplicación de código.

---

## Estructura del Proyecto

El código fuente se encuentra organizado dentro del directorio src bajo el siguiente esquema de empaquetado:

src
├── data
│   └── usuarios.ts        # Persistencia temporal en memoria con datos quemados.
├── models
│   ├── Usuario.ts          # Clase base abstracta.
│   ├── Cliente.ts          # Clase hija especializada para clientes.
│   └── Admin.ts            # Clase hija especializada para administradores.
├── services
│   └── UsuarioService.ts   # Lógica de negocio (registrar, buscar y filtrar).
├── utils
│   └── readline.ts         # Configuración de la interfaz de lectura de consola.
├── menu
│   └── menuSistema.ts      # Interfaz de usuario con menús anidados y tarjetas visuales.
└── main.ts                 # Punto de entrada de la aplicación.

---

## Arquitectura y Componentes

### 1. Modelos (src/models/)
* Usuario.ts: Clase abstracta que define las propiedades compartidas (id, nombre, email) y el método abstracto obtenerInfo(), forzando el uso de Herencia y Polimorfismo.
* Cliente.ts: Extiende de Usuario agregando el atributo único telefono.
* Admin.ts: Extiende de Usuario agregando el atributo único rol.

### 2. Datos (src/data/)
* BaseDatos.ts: Centraliza el almacenamiento temporal utilizando un arreglo global de tipo Usuario[]. Inicializa el sistema con registros previamente cargados (datos quemados) para facilitar las pruebas de búsqueda y listado.

### 3. Servicios (src/services/)
* UsuarioService.ts: Contiene la lógica operativa del sistema. Ofrece métodos limpios para registrar usuarios, buscar por identificador numérico y filtrar las entidades (cliente o admin) utilizando el operador instanceof.

### 4. Utilidades (src/utils/)
* readline.ts: Exporta una única instancia de readline encargada de gestionar el flujo de entrada y salida estándar de datos por terminal de forma controlada.

### 5. Menú (src/menu/)
* MenuSistema.ts: Controla el flujo visual e interactivo. Implementa un menú principal enfocado en la selección de la entidad y submenús especializados para cada una. Los datos se capturan en cascada mediante callbacks (rl.question) y las listas de salida se imprimen dentro de tarjetas formateadas (padEnd).

---

## Instalación y Ejecución

### Prerrequisitos
Tener instalado Node.js y el compilador de TypeScript globalmente o como dependencia de desarrollo.

### Pasos para ejecutar

1. Instalar dependencias (en caso de contar con un archivo package.json):
   npm install

2. Compilar el código TypeScript:
   tsc

3. Ejecutar la aplicación con Node:
   node dist/index.ts

(Nota: Dependiendo de tu configuración de entorno, también puedes utilizar herramientas como ts-node para ejecutar el archivo directamente sin compilar manualmente: ts-node src/index.ts).

---

## Características Principales Demostradas
* Herencia y Reutilización: Toda la información base se gestiona en la clase abstracta padre.
* Polimorfismo: El método obtenerInfo() se comporta de manera distinta dependiendo de si el objeto es un cliente o un administrador.
* Separación de Responsabilidades: El menú se encarga únicamente de interactuar con el usuario, delegando el almacenamiento y filtrado al servicio correspondiente.
