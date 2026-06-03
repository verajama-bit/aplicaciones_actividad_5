/**
 * @fileoverview Módulo de Filtros - Gestiona la búsqueda y filtrado de rutas
 * Responsabilidades: 
 *   - Capturar entrada del usuario
 *   - Validar parámetros de filtrado
 *   - Coordinar la lógica de filtros con servicios
 *   - Gestionar eventos del DOM
 *   - Mostrar mensajes al usuario
 * 
 * @author Equipo de Filtros - Grupo 7
 * @version 2.0 - Refactorizado
 */

// ======================================================================
// IMPORTACIONES
// ======================================================================

// Funciones de servicio para filtrado y ordenamiento
import {
    obtenerRutas
} from "./services/module-service.js";
import {
    aplicarFiltrosCombinados,
    ordenarPorHorario
} from "./utils/filter-service.js";

// Función de renderizado para mostrar resultados
import {
    renderizarRutas
} from "./render.js";

// Validadores y utilidades para los filtros
import {
    generarMensajeFiltro,
    obtenerContenedorMensajes,
    obtenerTextoBusqueda,
    obtenerTipoSeleccionado,
    validarParametrosFiltro
} from "./utils/filter-validators.js";

// ======================================================================
// ESTADO DEL MÓDULO
// ======================================================================

/**
 * Estado actual de los filtros
 * Mantiene un seguimiento de los valores de filtrado activos
 * 
 * @type {Object}
 * @property {string} textoBusqueda - Texto de búsqueda actual
 * @property {string} tipoSeleccionado - Tipo de ruta seleccionado
 * @property {number} contadorResultados - Cantidad de resultados
 */
const estadoFiltros = {
    textoBusqueda: '',
    tipoSeleccionado: '',
    contadorResultados: 0
};

// ======================================================================
// FUNCIONES PRINCIPALES
// ======================================================================

/**
 * Aplica todos los filtros activos a las rutas
 * 
 * Flujo:
 *   1. Captura valores de entrada desde el DOM
 *   2. Valida los parámetros
 *   3. Obtiene todas las rutas disponibles
 *   4. Filtra por destino y tipo
 *   5. Ordena por horario
 *   6. Actualiza el estado
 *   7. Muestra mensajes apropiados
 *   8. Renderiza los resultados
 * 
 * @returns {void}
 * @throws Maneja errores silenciosamente sin detener la ejecución
 */
function aplicarFiltros() {
    try {
        // PASO 1: Capturar valores de entrada desde el DOM
        const textoBusqueda = obtenerTextoBusqueda('buscarDestino');
        const tipoSeleccionado = obtenerTipoSeleccionado('filtroTipo');

        // PASO 2: Obtener todas las rutas disponibles
        let rutas = obtenerRutas();

        // PASO 3: Validar parámetros antes de filtrar
        const validacion = validarParametrosFiltro(
            rutas,
            textoBusqueda,
            tipoSeleccionado
        );

        if (!validacion.isValid) {
            console.warn('Parámetros de filtro inválidos:', validacion.errors);
            mostrarErrorFiltro(validacion.errors.join('. '));
            return;
        }

        // PASO 4: Aplicar filtros combinados (destino y tipo)
        let rutasFiltradas = aplicarFiltrosCombinados(
            rutas,
            textoBusqueda,
            tipoSeleccionado
        );

        // PASO 5: Ordenar resultados por horario
        rutasFiltradas = ordenarPorHorario(rutasFiltradas);

        // PASO 6: Actualizar estado del módulo
        actualizarEstadoFiltros(textoBusqueda, tipoSeleccionado, rutasFiltradas.length);

        // PASO 7: Mostrar mensaje apropiado al usuario
        mostrarMensajeFiltro(rutasFiltradas, textoBusqueda, tipoSeleccionado);

        // PASO 8: Renderizar resultados filtrados
        renderizarRutas(rutasFiltradas);

    } catch (error) {
        console.error('Error al aplicar filtros:', error);
        mostrarErrorFiltro('Error al procesar los filtros. Intente de nuevo.');
    }
}

/**
 * Actualiza el estado interno de los filtros
 * Mantiene un registro de los últimos valores utilizados
 * 
 * @param {string} textoBusqueda - Texto de búsqueda actual
 * @param {string} tipoSeleccionado - Tipo seleccionado actual
 * @param {number} contadorResultados - Cantidad de resultados obtenidos
 * @returns {void}
 * @private
 */
function actualizarEstadoFiltros(textoBusqueda, tipoSeleccionado, contadorResultados) {
    estadoFiltros.textoBusqueda = textoBusqueda;
    estadoFiltros.tipoSeleccionado = tipoSeleccionado;
    estadoFiltros.contadorResultados = contadorResultados;
}

/**
 * Muestra un mensaje al usuario según los resultados del filtrado
 * El mensaje es contextual: indica qué no se encontró
 * 
 * @param {Array} rutasFiltradas - Array de rutas después del filtrado
 * @param {string} textoBusqueda - Texto de búsqueda utilizado
 * @param {string} tipoSeleccionado - Tipo seleccionado
 * @returns {void}
 * @private
 */
function mostrarMensajeFiltro(rutasFiltradas, textoBusqueda, tipoSeleccionado) {
    const contenedorMensajes = obtenerContenedorMensajes('mensajeFiltro');
    
    if (!contenedorMensajes) {
        console.warn('Contenedor de mensajes no encontrado');
        return;
    }

    const mensaje = generarMensajeFiltro(rutasFiltradas, textoBusqueda, tipoSeleccionado);
    contenedorMensajes.textContent = mensaje;
    contenedorMensajes.style.color = rutasFiltradas.length > 0 ? 'var(--color-success, #2d8659)' : 'var(--color-error, #e74c3c)';
}

/**
 * Muestra un mensaje de error en el contenedor de mensajes
 * 
 * @param {string} textoError - Mensaje de error a mostrar
 * @returns {void}
 * @private
 */
function mostrarErrorFiltro(textoError) {
    const contenedorMensajes = obtenerContenedorMensajes('mensajeFiltro');
    
    if (contenedorMensajes) {
        contenedorMensajes.textContent = textoError;
        contenedorMensajes.style.color = 'var(--color-error, #e74c3c)';
    }
}

/**
 * Limpia todos los filtros activos y muestra todas las rutas
 * Resetea el estado a los valores iniciales
 * 
 * @returns {void}
 */
function limpiarFiltros() {
    // Limpiar inputs
    document.getElementById('buscarDestino').value = '';
    document.getElementById('filtroTipo').value = '';
    
    // Reiniciar estado
    actualizarEstadoFiltros('', '', 0);
    
    // Aplicar filtros (que ahora no filtrará nada)
    aplicarFiltros();
}

/**
 * Obtiene el estado actual de los filtros
 * Útil para debugging y pruebas
 * 
 * @returns {Object} Estado actual del módulo de filtros
 */
function obtenerEstadoFiltros() {
    return { ...estadoFiltros };
}

// ======================================================================
// ASIGNACIÓN DE EVENTOS
// ======================================================================

/**
 * Inicializa los event listeners del módulo de filtros
 * Se ejecuta automáticamente cuando el DOM está listo
 */
function inicializarEventos() {
    try {
        // Botón "Aplicar filtros"
        const btnFiltrar = document.getElementById('btnFiltrar');
        if (btnFiltrar) {
            btnFiltrar.addEventListener('click', aplicarFiltros);
        }

        // Input "Buscar destino" - búsqueda en tiempo real
        const inputBusqueda = document.getElementById('buscarDestino');
        if (inputBusqueda) {
            inputBusqueda.addEventListener('input', aplicarFiltros);
        }

        // Select "Filtro tipo" - filtrado automático
        const selectTipo = document.getElementById('filtroTipo');
        if (selectTipo) {
            selectTipo.addEventListener('change', aplicarFiltros);
        }

    } catch (error) {
        console.error('Error al inicializar eventos de filtros:', error);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarEventos);

// ======================================================================
// EXPORTACIONES
// ======================================================================

// Exportar funciones para testing y acceso externo
export {
    aplicarFiltros,
    limpiarFiltros,
    obtenerEstadoFiltros
};
