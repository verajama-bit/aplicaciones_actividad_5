// Modelo principal del sistema

export class Ruta{

    constructor(
        id,
        nombre,
        destino,
        horario,
        capacidad
    ){

        this.id = id;

        this.nombre = nombre;

        this.destino = destino;

        this.horario = horario;

        this.capacidad = capacidad;

        // Regla de negocio:
        // estado por defecto
        this.estado = "Disponible";
    }
}