🎬 Gestor de Películas — Node + Express + CORS

Este proyecto es una pequeña aplicación web que permite listar, agregar, editar y eliminar películas almacenadas en un archivo peliculas.json.
El frontend está hecho con HTML, CSS y JavaScript puro, y se comunica con un backend en Node.js utilizando Express y CORS.

📁 Estructura del proyecto
.
├── backend/
│   ├── servidor.js
│   ├── peliculas.json
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│
└── README.md

⚙️ Tecnologías utilizadas

Node.js – Entorno de ejecución para JavaScript en el servidor.

Express – Framework minimalista para crear el servidor HTTP.

CORS – Middleware que permite la comunicación entre el frontend y backend.

FS (File System) – Módulo nativo de Node.js para leer y escribir archivos JSON.

🚀 Instalación y ejecución

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1️⃣ Clonar el repositorio
git clone https://github.com/tuusuario/gestor-peliculas.git
cd gestor-peliculas/backend

2️⃣ Instalar dependencias

Asegúrate de tener Node.js instalado y ejecuta:

npm install express cors

3️⃣ Ejecutar el servidor
node servidor.js


📡 Si todo sale bien, deberías ver el mensaje:

Servidor escuchando en http://localhost:3000

4️⃣ Abrir el frontend

Abre el archivo frontend/index.html directamente en tu navegador o sirve esa carpeta con un servidor local (por ejemplo con Live Server de VS Code).

🧠 Funcionamiento general

El servidor lee y manipula un archivo peliculas.json, que actúa como base de datos.
El frontend consume la API a través de fetch() para mostrar y modificar las películas.

🧩 Endpoints disponibles
Método	Endpoint	Descripción	Datos requeridos
GET	/peliculas	Devuelve la lista completa de películas	—
POST	/peliculas	Crea una nueva película	{ name, artista, ano }
PUT	/peliculas/:id	Actualiza una película existente	{ name, artista, ano }
DELETE	/peliculas/:id	Elimina una película por ID	—
🗂️ Ejemplo de estructura JSON (peliculas.json)
[
  {
    "id": 1,
    "name": "La sociedad de la nieve",
    "artista": "Enzo Vogroncic",
    "ano": 2022
  },
  {
    "id": 2,
    "name": "El Titanic",
    "artista": "Leonardo Dicaprio",
    "ano": 1999
  }
]

💻 Interfaz del usuario

Desde el navegador, puedes:

✅ Ver todas las películas en una lista.
✅ Agregar nuevas películas.
✅ Editar las existentes.
✅ Eliminar películas con confirmación.
✅ Recibir mensajes de éxito o error en pantalla.

🧰 Archivos principales
servidor.js

Maneja todas las rutas de la API REST y gestiona la lectura/escritura del archivo peliculas.json.

script.js

Contiene toda la lógica del frontend:

Manejo del formulario.

Comunicación con la API mediante fetch.

Renderizado dinámico del listado.

Confirmaciones y mensajes al usuario.

index.html

Interfaz principal con formulario, lista de películas y modal de confirmación.

⚠️ Posibles mejoras

Implementar validaciones adicionales (por ejemplo, evitar duplicados).

Usar una base de datos real (SQLite, MongoDB, etc.).

Añadir un diseño más atractivo con algún framework CSS.

Manejar errores en frontend de forma más robusta.

Modularizar el backend.

🧑‍💻 Autor

Rubén Martín Méndez 

📧 rubenmartin2512@gmail.com

💻 github.com/rubenmm1