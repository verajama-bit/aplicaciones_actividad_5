```javascript id="v9r4jt"
// IMPORTACIÓN DEL STORAGE
import {
    obtenerDatos,
    guardarDatos
}
from "./storage.js";


// OBTENER TODAS LAS RUTAS
export function obtenerRutas(){

    return obtenerDatos();
}


// AGREGAR NUEVAS RUTAS
export function agregarRuta(ruta){

    const rutas = obtenerDatos();

    rutas.push(ruta);

    guardarDatos(rutas);
}


/* =====================================================
   FUNCIONES AGREGADAS PARA EL MÓDULO DE FILTROS
===================================================== */


/**
 * Filtra rutas por destino y tipo.
 *
 * @param {Array} rutas
 * @param {string} textoBusqueda
 * @param {string} tipoSeleccionado
 *
 * @returns {Array}
 */
export function filtrarRutas(
    rutas,
    textoBusqueda,
    tipoSeleccionado
){

    return rutas.filter(ruta => {

        const coincideDestino =
            ruta.destino
                .toLowerCase()
                .includes(
                    textoBusqueda.toLowerCase()
                );

        const coincideTipo =
            tipoSeleccionado === "" ||
            ruta.tipo === tipoSeleccionado;

        return coincideDestino &&
               coincideTipo;
    });
}


/**
 * Ordena rutas por horario.
 *
 * @param {Array} rutas
 *
 * @returns {Array}
 */
export function ordenarPorHorario(rutas){

    return rutas.sort((a, b) =>
        a.horario.localeCompare(b.horario)
    );
}
```
