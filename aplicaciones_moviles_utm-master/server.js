const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Datos de ejemplo (Mock Data)
let rutas = [
    { id: 1, destino: "Facultad de Ingeniería", horario: "07:00", tipo: "Normal", estado: "Disponible" },
    { id: 2, destino: "Campus Central", horario: "08:30", tipo: "Expreso", estado: "Disponible" },
    { id: 3, destino: "Biblioteca General", horario: "12:00", tipo: "Normal", estado: "Mantenimiento" }
];

/**
 * GET /
 * Ruta raíz para verificar el estado del servidor
 */
app.get('/', (req, res) => {
    res.send('<h1>Servidor API Funcionando</h1><p>Consulta los datos en: <a href="/api/rutas">/api/rutas</a></p>');
});

/**
 * GET /api/rutas
 * Lista todos los registros de rutas
 */
app.get('/api/rutas', (req, res) => {
    try {
        console.log('Petición recibida en GET /api/rutas');
        res.status(200).json(rutas);
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ mensaje: "Error al obtener las rutas" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor API corriendo en http://localhost:${PORT}`);
    console.log(`Endpoint disponible: GET http://localhost:${PORT}/api/rutas`);
});
