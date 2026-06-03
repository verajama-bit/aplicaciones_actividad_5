```javascript
import { renderizarRutas } from "./render.js";

import {
    agregarRuta,
    obtenerRutas
}
from "./services/module-service.js";


// MENSAJE
const mensaje =
    document.getElementById("mensaje");


// FORMULARIO
const formRuta =
    document.getElementById("formRuta");


// EVENTO SUBMIT
if (formRuta) {

    formRuta.addEventListener(
        "submit",
        registrarRuta
    );
}


/**
 * Registrar nueva ruta
 */
function registrarRuta(event) {

    event.preventDefault();

    // CAPTURAR DATOS
    const destino =
        document
            .getElementById("destino")
            .value
            .trim();

    const bus =
        document
            .getElementById("bus")
            .value
            .trim();

    const horario =
        document
            .getElementById("horario")
            .value;

    const estado =
        document
            .getElementById("estado")
            .value;

    const tipo =
        document
            .getElementById("tipo")
            .value;


    // VALIDACIONES
    if (
        destino === "" ||
        bus === "" ||
        horario === ""
    ) {

        mostrarMensaje(
            "Todos los campos son obligatorios.",
            "error"
        );

        return;
    }


    // VALIDAR DESTINO
    if (destino.length < 3) {

        mostrarMensaje(
            "El destino debe tener mínimo 3 caracteres.",
            "error"
        );

        return;
    }


    // VALIDAR BUS
    if (bus.length < 3) {

        mostrarMensaje(
            "El nombre del bus es demasiado corto.",
            "error"
        );

        return;
    }


    // OBTENER RUTAS
    const rutas =
        obtenerRutas();


    // REGLA NEGOCIO:
    // EVITAR HORARIOS REPETIDOS
    const existeRuta =
        rutas.some(ruta =>

            ruta.bus.toLowerCase() ===
            bus.toLowerCase()

            &&

            ruta.horario === horario
        );


    if (existeRuta) {

        mostrarMensaje(
            "Ya existe una ruta con ese horario.",
            "error"
        );

        return;
    }


    // GENERAR NUEVO ID
    const nuevoId =
        rutas.length > 0
        ?
        rutas[rutas.length - 1].id + 1
        :
        1;


    // CREAR OBJETO
    const nuevaRuta = {

        id: nuevoId,
        destino,
        bus,
        horario,
        estado,
        tipo
    };


    // AGREGAR RUTA
    agregarRuta(nuevaRuta);


    // ACTUALIZAR INTERFAZ
    renderizarRutas(
        obtenerRutas()
    );


    // MENSAJE ÉXITO
    mostrarMensaje(
        "Ruta registrada correctamente.",
        "success"
    );


    // LIMPIAR FORMULARIO
    formRuta.reset();
}


/**
 * Mostrar mensajes
 */
function mostrarMensaje(
    texto,
    tipo
){

    if (!mensaje) {

        return;
    }

    mensaje.textContent = texto;

    mensaje.style.color =
        tipo === "error"
        ?
        "#ef4444"
        :
        "#10b981";


    // OCULTAR MENSAJE
    setTimeout(() => {

        mensaje.textContent = "";

    }, 3000);
}
```
