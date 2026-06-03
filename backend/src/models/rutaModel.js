class Ruta {
    constructor(
        id,
        destino,
        bus,
        horario,
        estado,
        tipo
    ) {
        this.id = id;
        this.destino = destino;
        this.bus = bus;
        this.horario = horario;
        this.estado = estado;
        this.tipo = tipo;
    }
}

module.exports = Ruta;
