const db = require("../config/db");

const rutas = [
    {
        destino: "Universidad Tecnica de Manabi",
        bus: "Coop. Portoviejo Ruta 2",
        horario: "07:00:00",
        estado: "Disponible",
        tipo: "Normal"
    },
    {
        destino: "Universidad Tecnica de Manabi",
        bus: "Coop. Higueron Ruta 1",
        horario: "07:00:00",
        estado: "Disponible",
        tipo: "Normal"
    },
    {
        destino: "Universidad Tecnica de Manabi",
        bus: "Coop. Ciudad Del Valle",
        horario: "10:00:00",
        estado: "Mantenimiento",
        tipo: "Normal"
    },
    {
        destino: "Universidad Laica Eloy Alfaro",
        bus: "Coop. FETUM Ruta 17",
        horario: "05:30:00",
        estado: "Disponible",
        tipo: "Normal"
    },
    {
        destino: "Universidad Tecnica de Manabi - extension Lodana",
        bus: "Universidad Tecnica de Manabi",
        horario: "07:30:00",
        estado: "Disponible",
        tipo: "Expreso"
    }
];

db.query("DELETE FROM rutas", (error) => {
    if (error) {
        console.error("Error al limpiar tabla:", error);
        return;
    }

    rutas.forEach((ruta) => {
        db.query(
            `INSERT INTO rutas (destino, bus, horario, estado, tipo)
             VALUES (?, ?, ?, ?, ?)`,
            [
                ruta.destino,
                ruta.bus,
                ruta.horario,
                ruta.estado,
                ruta.tipo
            ]
        );
    });

    console.log("Datos semilla insertados correctamente.");
});
