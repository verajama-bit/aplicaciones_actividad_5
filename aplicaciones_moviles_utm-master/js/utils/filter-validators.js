
/**
 * @fileoverview Utilidades de validación para el módulo de filtros
 * Proporciona funciones reutilizables para validar y procesar parámetros de filtrado
 * 
 * @author Equipo de Filtros - Grupo 7
 * @version 1.1
 */

const MAX_CARACTERES_TEXTO_FILTRO = 50;
const TIPOS_RUTA_DISPONIBLES = ["", "Normal", "Expreso"];

/**
 * Valida que el texto de búsqueda sea una cadena no nula
 * 
 * @param {string} textoBusqueda - Texto a validar
 * @returns {boolean} True si es válido, false en caso contrario
 * @example
 * esTextoBusquedaValido("Universidad") // true
 * esTextoBusquedaValido("") // true (permite vacío)
 */
export function esTextoBusquedaValido(textoBusqueda) {
    return (
        typeof textoBusqueda === 'string' &&
        textoBusqueda.length <= MAX_CARACTERES_TEXTO_FILTRO
    );
}

/**
 * Valida que el tipo de ruta sea una cadena válida
 * 
 * @param {string} tipoRuta - Tipo de ruta a validar
 * @returns {boolean} True si es válido, false en caso contrario
 */
export function esTipoRutaValido(tipoRuta) {
    return typeof tipoRuta === 'string' && TIPOS_RUTA_DISPONIBLES.includes(tipoRuta);
}

/**
 * Normaliza el texto de búsqueda: convierte a minúsculas y elimina espacios
 * 
 * @param {string} texto - Texto a normalizar
 * @returns {string} Texto normalizado
 * @example
 * normalizarTexto("  UNIVERSIDAD  ") // "universidad"
 */
export function normalizarTexto(texto) {
    if (typeof texto !== 'string') return '';
    return texto.toLowerCase().trim();
}

/**
 * Valida que el array de rutas sea un array válido
 * 
 * @param {Array} rutas - Array a validar
 * @returns {boolean} True si es un array válido, false en caso contrario
 */
export function esArrayRutasValido(rutas) {
    return Array.isArray(rutas) && rutas.length >= 0;
}

/**
 * Verifica que una ruta tenga todos los campos requeridos para filtrar
 * 
 * @param {Object} ruta - Objeto ruta a validar
 * @returns {boolean} True si tiene todos los campos, false en caso contrario
 * @private
 */
export function tieneFieldsFiltrado(ruta) {
    return (
        ruta && 
        typeof ruta === 'object' &&
        'destino' in ruta &&
        'tipo' in ruta
    );
}

/**
 * Valida los valores de entrada para filtrado
 * Retorna un objeto con información de validación
 * 
 * @param {Array} rutas - Array de rutas a validar
 * @param {string} textoBusqueda - Texto de búsqueda
 * @param {string} tipoSeleccionado - Tipo seleccionado
 * @returns {Object} Objeto con propiedades: isValid, errors
 * @example
 * const resultado = validarParametrosFiltro([...], "text", "Normal");
 * console.log(resultado); // { isValid: true, errors: [] }
 */
export function validarParametrosFiltro(rutas, textoBusqueda, tipoSeleccionado) {
    const errores = [];

    if (!esArrayRutasValido(rutas)) {
        errores.push('El array de rutas no es válido');
    }

    if (!esTextoBusquedaValido(textoBusqueda)) {
        errores.push(
            `El texto de búsqueda debe ser una cadena de máximo ${MAX_CARACTERES_TEXTO_FILTRO} caracteres`
        );
    }

    if (!esTipoRutaValido(tipoSeleccionado)) {
        errores.push('El tipo de ruta seleccionado no es válido');
    }

    return {
        isValid: errores.length === 0,
        errors: errores
    };
}

/**
 * Obtiene el valor actual del campo de búsqueda desde el DOM
 * Incluye validación y normalización
 * 
 * @param {string} selectId - ID del elemento input de búsqueda
 * @returns {string} Valor normalizado del campo
 * @throws {Error} Si el elemento no existe
 */
export function obtenerTextoBusqueda(selectId = 'buscarDestino') {
    const elemento = document.getElementById(selectId);
    
    if (!elemento) {
        throw new Error(`Elemento con ID "${selectId}" no encontrado`);
    }

    return normalizarTexto(elemento.value);
}

/**
 * Obtiene el valor actual del filtro tipo desde el DOM
 * 
 * @param {string} selectId - ID del elemento select de tipo
 * @returns {string} Valor del tipo seleccionado
 * @throws {Error} Si el elemento no existe
 */
export function obtenerTipoSeleccionado(selectId = 'filtroTipo') {
    const elemento = document.getElementById(selectId);
    
    if (!elemento) {
        throw new Error(`Elemento con ID "${selectId}" no encontrado`);
    }

    return elemento.value;
}

/**
 * Valida que el contenedor para mensajes exista
 * 
 * @param {string} containerId - ID del contenedor de mensajes
 * @returns {HTMLElement|null} El elemento si existe, null en caso contrario
 */
export function obtenerContenedorMensajes(containerId = 'mensajeFiltro') {
    return document.getElementById(containerId);
}

/**
 * Determina si no hay resultados en la búsqueda
 * 
 * @param {Array} rutas - Array de rutas filtradas
 * @returns {boolean} True si no hay resultados
 */
export function noHayResultados(rutas) {
    return Array.isArray(rutas) && rutas.length === 0;
}

/**
 * Genera un mensaje apropiado según el estado de los filtros
 * 
 * @param {Array} rutasFiltradas - Array de rutas después de filtrar
 * @param {string} textoBusqueda - Texto de búsqueda utilizado
 * @param {string} tipoSeleccionado - Tipo seleccionado
 * @returns {string} Mensaje apropiado
 */
export function generarMensajeFiltro(rutasFiltradas, textoBusqueda, tipoSeleccionado) {
    if (rutasFiltradas.length === 0) {
        let razon = '';

        if (textoBusqueda && tipoSeleccionado) {
            razon = `"${textoBusqueda}" y tipo "${tipoSeleccionado}"`;
        } else if (textoBusqueda) {
            razon = `"${textoBusqueda}"`;
        } else if (tipoSeleccionado) {
            razon = `tipo "${tipoSeleccionado}"`;
        }

        return razon
            ? `No se encontraron rutas con ${razon}.`
            : 'No se encontraron rutas.';
    }

    const texto = textoBusqueda ? `destino "${textoBusqueda}"` : 'todos los destinos';
    const tipo = tipoSeleccionado ? ` tipo "${tipoSeleccionado}"` : '';

    return `Mostrando ${rutasFiltradas.length} rutas para ${texto}${tipo}.`;
}
