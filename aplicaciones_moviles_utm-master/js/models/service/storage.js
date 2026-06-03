```javascript id="8k4mwu"
const STORAGE_KEY = "rutasUniversitarias";


// GUARDAR RUTAS
export function guardarRutasStorage(rutas) {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(rutas)
        );

        return true;

    } catch (error) {

        console.error(
            "Error al guardar rutas:",
            error
        );

        return false;
    }
}


// CARGAR RUTAS
export function cargarRutasStorage() {

    try {

        const rutasGuardadas =
            localStorage.getItem(STORAGE_KEY);

        // SI NO EXISTEN DATOS
        if (!rutasGuardadas) {

            return [];
        }

        const datos =
            JSON.parse(rutasGuardadas);

        // VALIDAR ESTRUCTURA
        if (!Array.isArray(datos)) {

            return [];
        }

        return datos;

    } catch (error) {

        console.error(
            "Error al cargar rutas:",
            error
        );

        return [];
    }
}


// LIMPIAR STORAGE
export function limpiarStorage() {

    localStorage.removeItem(
        STORAGE_KEY
    );
}
```
