
/**
 * @fileoverview Servicio de Filtros - Lógica reutilizable de filtrado y búsqueda
 * Responsabilidades:
 *   - Filtrar rutas por criterios múltiples
 *   - Normalizar datos antes de filtrar
 *   - Ordenar resultados
 *   - Proporcionar operaciones de búsqueda avanzada
 * 
 * @author Equipo de Filtros - Grupo 7
 * @version 1.0
 */

import {
    normalizarTexto,
    tieneFieldsFiltrado
} from "./filter-validators.js";

// ======================================================================
// OPERACIONES BÁSICAS DE FILTRADO
// ======================================================================

/**
 * Filtra rutas por criterio de destino (búsqueda de texto)
 * Busca coincidencias parciales, insensible a mayúsculas
 * 
 * @param {Array<Object>} rutas - Array de rutas a filtrar
 * @param {string} textoBusqueda - Texto para buscar en destino
 * @returns {Array<Object>} Rutas que coinciden con el texto
 * @example
 * const resultado = filtrarPorDestino(rutas, "Universidad");
 * // Retorna rutas con "Universidad" en el destino
 */
export function filtrarPorDestino(rutas, textoBusqueda) {
    if (!Array.isArray(rutas) || !textoBusqueda) {
        return rutas;
    }

    const textoBusquedaNormalizado = normalizarTexto(textoBusqueda);

    return rutas.filter(ruta => {
        if (!tieneFieldsFiltrado(ruta)) return false;

        const destinoNormalizado = normalizarTexto(ruta.destino);
        return destinoNormalizado.includes(textoBusquedaNormalizado);
    });
}

/**
 * Filtra rutas por tipo específico
 * Búsqueda exacta (case-insensitive)
 * 
 * @param {Array<Object>} rutas - Array de rutas a filtrar
 * @param {string} tipo - Tipo de ruta (ej: "Normal", "Expreso")
 * @returns {Array<Object>} Rutas que coinciden con el tipo
 * @example
 * const rutasExpreso = filtrarPorTipo(rutas, "Expreso");
 */
export function filtrarPorTipo(rutas, tipo) {
    // Si tipo está vacío, retornar todas las rutas
    if (!Array.isArray(rutas) || !tipo) {
        return rutas;
    }

    return rutas.filter(ruta => {
        if (!tieneFieldsFiltrado(ruta)) return false;
        return ruta.tipo === tipo;
    });
}

/**
 * Filtra rutas por estado
 * Útil para mostrar solo rutas disponibles
 * 
 * @param {Array<Object>} rutas - Array de rutas a filtrar
 * @param {string} estado - Estado requerido (ej: "Disponible", "Mantenimiento")
 * @returns {Array<Object>} Rutas con el estado especificado
 * @example
 * const disponibles = filtrarPorEstado(rutas, "Disponible");
 */
export function filtrarPorEstado(rutas, estado) {
    if (!Array.isArray(rutas) || !estado) {
        return rutas;
    }

    return rutas.filter(ruta => ruta.estado === estado);
}

// ======================================================================
// COMBINACIÓN DE FILTROS
// ======================================================================

/**
 * Aplica múltiples filtros de forma combinada
 * Es la función principal de filtrado utilizada por el módulo
 * 
 * Flujo:
 *   1. Filtra por destino (búsqueda de texto)
 *   2. Filtra por tipo (si está especificado)
 *   3. Opcionalmente filtra por estado
 * 
 * @param {Array<Object>} rutas - Array de rutas a filtrar
 * @param {string} textoBusqueda - Texto para buscar en destino
 * @param {string} tipoSeleccionado - Tipo de ruta seleccionado
 * @param {string} [estadoFiltro] - Estado opcional a filtrar
 * @returns {Array<Object>} Rutas que cumplen todos los criterios
 * @example
 * const resultado = aplicarFiltrosCombinados(
 *   rutas,
 *   "Universidad",
 *   "Normal",
 *   "Disponible"
 * );
 */
export function aplicarFiltrosCombinados(
    rutas,
    textoBusqueda,
    tipoSeleccionado,
    estadoFiltro = null
) {
    if (!Array.isArray(rutas)) {
        return [];
    }

    // Aplicar filtros en cascada
    let rutasFiltradas = rutas;

    // 1. Filtrar por destino
    rutasFiltradas = filtrarPorDestino(rutasFiltradas, textoBusqueda);

    // 2. Filtrar por tipo
    rutasFiltradas = filtrarPorTipo(rutasFiltradas, tipoSeleccionado);

    // 3. Filtrar por estado (opcional)
    if (estadoFiltro) {
        rutasFiltradas = filtrarPorEstado(rutasFiltradas, estadoFiltro);
    }

    return rutasFiltradas;
}

// ======================================================================
// OPERACIONES DE ORDENAMIENTO
// ======================================================================

/**
 * Ordena rutas por horario de forma ascendente
 * Utiliza comparación de strings de tiempo (HH:MM)
 * 
 * @param {Array<Object>} rutas - Array de rutas a ordenar
 * @returns {Array<Object>} Nuevas rutas ordenadas sin mutar el original
 * @example
 * const ordenadas = ordenarPorHorario(rutas);
 */
export function ordenarPorHorario(rutas) {
    if (!Array.isArray(rutas)) {
        return [];
    }

    // Crear copia para no mutar el array original
    return [...rutas].sort((a, b) => {
        const horarioA = a.horario || '';
        const horarioB = b.horario || '';
        return horarioA.localeCompare(horarioB);
    });
}

/**
 * Ordena rutas por destino alfabéticamente
 * 
 * @param {Array<Object>} rutas - Array de rutas a ordenar
 * @param {string} [direccion='asc'] - Dirección de ordenamiento ('asc' o 'desc')
 * @returns {Array<Object>} Nuevas rutas ordenadas
 * @example
 * const ordenadas = ordenarPorDestino(rutas);
 * const descendente = ordenarPorDestino(rutas, 'desc');
 */
export function ordenarPorDestino(rutas, direccion = 'asc') {
    if (!Array.isArray(rutas)) {
        return [];
    }

    const rutasOrdenadas = [...rutas].sort((a, b) => {
        const destinoA = (a.destino || '').toLowerCase();
        const destinoB = (b.destino || '').toLowerCase();
        return destinoA.localeCompare(destinoB);
    });

    return direccion === 'desc' ? rutasOrdenadas.reverse() : rutasOrdenadas;
}

/**
 * Ordena rutas por tipo
 * 
 * @param {Array<Object>} rutas - Array de rutas a ordenar
 * @returns {Array<Object>} Nuevas rutas ordenadas por tipo
 * @example
 * const ordenadas = ordenarPorTipo(rutas);
 */
export function ordenarPorTipo(rutas) {
    if (!Array.isArray(rutas)) {
        return [];
    }

    return [...rutas].sort((a, b) => {
        const tipoA = (a.tipo || '').toLowerCase();
        const tipoB = (b.tipo || '').toLowerCase();
        return tipoA.localeCompare(tipoB);
    });
}

// ======================================================================
// OPERACIONES DE BÚSQUEDA AVANZADA
// ======================================================================

/**
 * Búsqueda de texto en múltiples campos de la ruta
 * Permite buscar en destino, bus y horario
 * 
 * @param {Array<Object>} rutas - Array de rutas a buscar
 * @param {string} textoBusqueda - Texto a buscar
 * @param {Array<string>} campos - Campos donde buscar (ej: ['destino', 'bus', 'horario'])
 * @returns {Array<Object>} Rutas que contienen el texto en alguno de los campos
 * @example
 * const resultados = buscarEnMultiplesCampos(
 *   rutas,
 *   "bus 5",
 *   ['destino', 'bus']
 * );
 */
export function buscarEnMultiplesCampos(rutas, textoBusqueda, campos = ['destino', 'bus']) {
    if (!Array.isArray(rutas) || !textoBusqueda) {
        return rutas;
    }

    const textoBusquedaNormalizado = normalizarTexto(textoBusqueda);

    return rutas.filter(ruta => {
        return campos.some(campo => {
            const valor = ruta[campo] || '';
            const valorNormalizado = normalizarTexto(valor);
            return valorNormalizado.includes(textoBusquedaNormalizado);
        });
    });
}

/**
 * Obtiene estadísticas de las rutas filtradas
 * Útil para mostrar información en la interfaz
 * 
 * @param {Array<Object>} rutas - Array de rutas a analizar
 * @returns {Object} Objeto con estadísticas
 * @property {number} total - Total de rutas
 * @property {number} disponibles - Rutas disponibles
 * @property {number} enMantenimiento - Rutas en mantenimiento
 * @property {Object} porTipo - Conteo de rutas por tipo
 * @example
 * const stats = obtenerEstadisticas(rutas);
 * console.log(stats.disponibles); // 5
 */
export function obtenerEstadisticas(rutas) {
    if (!Array.isArray(rutas)) {
        return {
            total: 0,
            disponibles: 0,
            enMantenimiento: 0,
            porTipo: {}
        };
    }

    const stats = {
        total: rutas.length,
        disponibles: 0,
        enMantenimiento: 0,
        porTipo: {}
    };

    rutas.forEach(ruta => {
        // Contar por estado
        if (ruta.estado === 'Disponible') {
            stats.disponibles++;
        } else if (ruta.estado === 'Mantenimiento') {
            stats.enMantenimiento++;
        }

        // Contar por tipo
        const tipo = ruta.tipo || 'Desconocido';
        stats.porTipo[tipo] = (stats.porTipo[tipo] || 0) + 1;
    });

    return stats;
}

// ======================================================================
// OPERACIONES DE UTILIDAD
// ======================================================================

/**
 * Valida que todas las rutas en un array tengan los campos requeridos
 * 
 * @param {Array<Object>} rutas - Array de rutas a validar
 * @param {Array<string>} camposRequeridos - Campos que deben existir
 * @returns {boolean} True si todas las rutas tienen los campos, false en caso contrario
 * @example
 * const valido = validarEstructuraRutas(rutas, ['destino', 'horario', 'tipo']);
 */
export function validarEstructuraRutas(rutas, camposRequeridos = ['destino', 'horario', 'tipo', 'estado']) {
    if (!Array.isArray(rutas)) {
        return false;
    }

    return rutas.every(ruta => 
        typeof ruta === 'object' && camposRequeridos.every(campo => campo in ruta)
    );
}

/**
 * Convierte resultados de filtrado a un formato simplificado
 * Útil para exportar datos o mostrar resúmenes
 * 
 * @param {Array<Object>} rutas - Array de rutas
 * @param {Array<string>} campos - Campos a incluir en el resultado
 * @returns {Array<Object>} Array con solo los campos especificados
 * @example
 * const resumen = proyectarCampos(rutas, ['destino', 'horario']);
 */
export function proyectarCampos(rutas, campos) {
    if (!Array.isArray(rutas)) {
        return [];
    }

    return rutas.map(ruta => {
        const resultado = {};
        campos.forEach(campo => {
            resultado[campo] = ruta[campo];
        });
        return resultado;
    });
}
