CREATE DATABASE IF NOT EXISTS transporte_utm;
USE transporte_utm;

CREATE TABLE IF NOT EXISTS rutas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destino VARCHAR(150) NOT NULL,
    bus VARCHAR(100) NOT NULL,
    horario TIME NOT NULL,
    estado ENUM('Disponible', 'Mantenimiento') NOT NULL,
    tipo ENUM('Normal', 'Expreso') NOT NULL
);
Insersion de datos semilla (basados en seed.js)
INSERT INTO rutas (destino, bus, horario, estado, tipo) VALUES 
('Universidad Tecnica de Manabi', 'Coop. Portoviejo Ruta 2', '07:00:00', 'Disponible', 'Normal'),
('Universidad Tecnica de Manabi', 'Coop. Higueron Ruta 1', '07:00:00', 'Disponible', 'Normal'),
('Universidad Tecnica de Manabi', 'Coop. Ciudad Del Valle', '10:00:00', 'Mantenimiento', 'Normal'),
('Universidad Laica Eloy Alfaro', 'Coop. FETUM Ruta 17', '05:30:00', 'Disponible', 'Normal'),
('Universidad Tecnica de Manabi - extension Lodana', 'Universidad Tecnica de Manabi', '07:30:00', 'Disponible', 'Expreso');
