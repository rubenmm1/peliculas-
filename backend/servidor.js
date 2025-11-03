import express from 'express';

// fs (File System): Nos permite leer y escribir archivos
import fs from 'fs';

// path: Nos ayuda a manejar rutas de archivos de forma correcta
import path from 'path';

// cors: Permite que nuestro frontend se comunique con el backend
import cors from 'cors';

// fileURLToPath: Necesario para obtener la carpeta actual en módulos ES6
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PUERTO = 3000;

const ARCHIVO_PELICULAS = path.join(__dirname, 'peliculas.json');

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

function leerPeliculas() {
    try {
        // Leer el archivo como texto
        const contenido = fs.readFileSync(ARCHIVO_PELICULAS, 'utf8');
        
        // Convertir el texto JSON en un array de JavaScript
        // Express.json analiza (parsea) el cuerpo de las peticiones HTTP que lleguen desde el cliente (frontend).
        // Aquí estás leyendo un archivo del disco duro, no una petición del cliente.
        const peliculas = JSON.parse(contenido); //Convierte a objeto
        
        console.log(`📖 Se leyeron ${peliculas.length} peliculaes del archivo`);
        return peliculas;
    } catch (error) {
        // Si hay un error (archivo no existe, está corrupto, etc.), devolver array vacío
        console.error('❌ Error al leer peliculas:', error.message);
        return [];
    }
}


app.get('/peliculas', (peticion, respuesta) => {
    const peliculas=leerPeliculas();
    respuesta.json(peliculas); //Convierte a texto plano (JSON)
});


app.listen(PUERTO, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
})


app.post('/peliculas', (peticion, respuesta) => {
    console.log('➕ Solicitud: Crear nueva pelicula');
    console.log('📦 Datos recibidos:', peticion.body);
    
    // Extraer los datos que nos envió el navegador
    const { name, artista, ano } = peticion.body;
    
    // Validar que todos los campos estén presentes
    if (!name || !artista || !ano) {
        return respuesta.status(400).json({
            exito: false,
            mensaje: 'Faltan datos. Se necesita: titulo, artista y año'
        });
    }
    
    // Leer las peliculas actuales
    const peliculas = leerPeliculas();
    
    // Crear la nueva pelicula
    const nuevaPelicula = {
        id: obtenerSiguienteId(peliculas),
        name: name.trim(), // trim() quita espacios al inicio y final
        artista: artista.trim(),
        ano: parseInt(ano) // Asegurar que sea un número
    };
    
    // Agregar la nueva pelicula al array
    peliculas.push(nuevaPelicula);
    
    // Guardar todo en el archivo
    if (guardarPeliculas(peliculas)) {
        respuesta.status(201).json({
            exito: true,
            datos: nuevaPelicula,
            mensaje: `Pelicula "${nuevaPelicula.name}" creada exitosamente`
        });
    } else {
        respuesta.status(500).json({
            exito: false,
            mensaje: 'Error al guardar la canción en el archivo'
        });
    }
});


function guardarPeliculas(peliculas) {
    try {
        // Convertir el array de JavaScript a texto JSON (bonito y formateado)
        const contenidoJSON = JSON.stringify(peliculas, null, 2);
        
        // Escribir el contenido al archivo
        fs.writeFileSync(ARCHIVO_PELICULAS, contenidoJSON);
        
        console.log(`💾 Se guardaron ${peliculas.length} peliculaes en el archivo`);
        return true;
    } catch (error) {
        console.error('❌ Error al guardar peliculas:', error.message);
        return false;
    }
}



function obtenerSiguienteId(peliculas) {
    // Si no hay peliculaes, el primer ID es 1
    if (peliculas.length === 0) {
        return 1;
    }
    
    // Buscar el ID más alto y sumarle 1
    const ids = peliculas.map(pelicula => pelicula.id); // Extraer solo los IDs
    const idMasAlto = Math.max(...ids); // Encontrar el mayor
    return idMasAlto + 1;
}



app.put('/peliculas/:id', (peticion, respuesta) => {
    const id = parseInt(peticion.params.id);
    console.log(`✏️ Solicitud: Actualizar pelicula con ID ${id}`);
    console.log('📦 Nuevos datos:', peticion.body);
    
    const { name, artista, año } = peticion.body;
    
    // Validar datos
    if (!name || !artista || !año) {
        return respuesta.status(400).json({
            exito: false,
            mensaje: 'Faltan datos. Se necesita: titulo, artista y año'
        });
    }
    
    // Leer canciones actuales
    const peliculas = leerPeliculas();
    
    // Buscar la posición de la canción a actualizar
    const indice = canciones.findIndex(c => c.id === id);
    
    if (indice === -1) {
        return respuesta.status(404).json({
            exito: false,
            mensaje: `No se encontró una canción con ID ${id}`
        });
    }
    
    // Actualizar la canción (mantenemos el ID original)
    canciones[indice] = {
        id: id, // Mantener el ID original
        name: name.trim(),
        artista: artista.trim(),
        ano: parseInt(año)
    };
    
    // Guardar los cambios
    if (guardarPeliculas(peliculas)) {
        respuesta.json({
            exito: true,
            datos: peliculas[indice],
            mensaje: `Pelicula "${Peliculas[indice].name}" actualizada exitosamente`
        });
    } else {
        respuesta.status(500).json({
            exito: false,
            mensaje: 'Error al guardar los cambios'
        });
    }
});