// Valida campos vacíos

export function campoVacio(valor){

    return valor.trim() === "";
}

// Regla de negocio:
// capacidad mínima

export function capacidadValida(capacidad){

    return capacidad >= 10;
}
// Limpia y valida texto
export function validarTexto(texto){

    if(!texto){
        return "";
    }

    return texto.trim();
}
