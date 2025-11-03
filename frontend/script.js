
const URL_API = 'http://localhost:3000/peliculas';


let peliculaQueEstamosEditando = null;


// Elementos del formulario
const formulario = document.getElementById('formulario-pelicula');
const campoTitulo = document.getElementById('titulo');
const campoArtista = document.getElementById('artista');
const campoAno = document.getElementById('año');

// Botones
const botonGuardar = document.getElementById('btn-guardar');
const botonCancelar = document.getElementById('btn-cancelar');


const mensajes = document.getElementById('mensaje');


formulario.addEventListener('submit', async (evento) => {
    // Prevenir que la página se recargue (comportamiento por defecto del formulario)
    evento.preventDefault();
    
    console.log('📝 Usuario envió el formulario');
    
    // Obtener los datos que escribió el usuario
    const titulo = campoTitulo.value.trim(); // trim() quita espacios extra
    const artista = campoArtista.value.trim();
    const ano = parseInt(campoAno.value); // Convertir a número
    
    // Validar que todos los campos estén llenos
    if (!titulo || !artista || !ano) {
        mostrarMensaje('Por favor, completa todos los campos', 'error');
        return; // Salir de la función sin hacer nada más
    }
    
    // Crear objeto con los datos
    const datosPelicula = {
        name: titulo,
        artista: artista,
        ano: ano
    };
    
    // Decidir si crear nueva canción o actualizar existente
    if (peliculaQueEstamosEditando) {
        // Estamos editando: actualizar canción existente
        await actualizarPeliculaExistente(peliculaQueEstamosEditando, datosPelicula);
    } else {
        // No estamos editando: crear nueva canción
        await crearNuevaPelicula(datosPelicula);
    }
});


function mostrarMensaje(texto, tipo = 'info') {
    console.log(`💬 Mostrando mensaje: ${texto}`);
    
    // Cambiar el texto del mensaje
    mensajes.textContent = texto;
    
    // Cambiar el estilo según el tipo
    mensajes.className = `mensaje ${tipo}`;
    
    // Hacer visible el mensaje (quitar la clase 'oculto')
    mensajes.classList.remove('oculto');
    
    // Después de 5 segundos, ocultar el mensaje automáticamente
    setTimeout(() => {
        mensajes.classList.add('oculto');
    }, 5000);
}

async function crearNuevaPelicula(datosPelicula) {
    try {
        console.log('📡 Enviando nueva pelicula al servidor:', datosPelicula);
        
        // FETCH con método POST: Es como enviar una carta al servidor
        const respuesta = await fetch(URL_API, {
            method: 'POST', // POST significa "crear algo nuevo"
            headers: {
                'Content-Type': 'application/json' // Decimos que enviamos JSON
            },
            body: JSON.stringify(datosPelicula) // Convertir objeto a texto JSON
        });
        
        const datos = await respuesta.json();
        console.log('📦 Respuesta del servidor:', datos);
        
        if (datos.exito) {
            mostrarMensaje(datos.mensaje, 'exito');
            limpiarFormulario();
            cargarMechas(); // Actualizar la lista
        } else {
            mostrarMensaje(datos.mensaje, 'error');
        }
        
    } catch (error) {
        console.error('❌ Error al crear canción:', error);
        mostrarMensaje('Error al guardar la canción', 'error');
    }
}






async function actualizarPeliculaExistente(id, datosPelicula) {
    try {
        console.log(`📡 Actualizando pelicula ${id}:`, datosPelicula);
        
        // FETCH con método PUT: Significa "actualizar algo existente"
        const respuesta = await fetch(`${URL_API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosPelicula)
        });
        
        const datos = await respuesta.json();
        console.log('📦 Respuesta del servidor:', datos);
        
        if (datos.exito) {
            mostrarMensaje(datos.mensaje, 'exito');
            limpiarFormulario();
            obtenerTodasLasPeliculaes(); // Actualizar la lista
        } else {
            mostrarMensaje(datos.mensaje, 'error');
        }
        
    } catch (error) {
        console.error('❌ Error al actualizar canción:', error);
        mostrarMensaje('Error al actualizar la canción', 'error');
    }
}



async function cargarMechas() {
      try {
        const res = await fetch('http://localhost:3000/peliculas');
        const peliculas = await res.json();
 
        const contenedor = document.getElementById('mechaList');
        contenedor.innerHTML = '';
 
        peliculas.forEach(pelicula => {
          const card = document.createElement('div');
          card.className = 'mecha-card';
          card.innerHTML = `
            <h3>${pelicula.name}</h3>
            <p><strong>Artista:</strong> ${pelicula.artista}</p>
            <p><strong>Año:</strong> ${pelicula.ano}</p>
          `;
          contenedor.appendChild(card);
        });
      } catch (error) {
        console.error('Error cargando peliculas:', error);
        document.getElementById('mechaList').innerHTML =
          '<p>Error al cargar los datos 😢</p>';
      }
    }
 
    cargarMechas();