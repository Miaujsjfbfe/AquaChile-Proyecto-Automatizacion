CREATE DATABASE IF NOT EXISTS aquachile_db;
USE aquachile_db;

-- 1. Usuarios del Sistema (Analistas de Reclutamiento y Profesionales Evaluadores)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('analista', 'evaluador') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Candidatos
CREATE TABLE IF NOT EXISTS candidatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(30) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Solicitudes de Evaluación
CREATE TABLE IF NOT EXISTS solicitudes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidato_id INT NOT NULL,
    evaluador_id INT NULL,
    cargo VARCHAR(100) NOT NULL,
    familia_cargo VARCHAR(100) NOT NULL,
    archivo_url VARCHAR(255) NULL,
    carpeta_drive_url VARCHAR(255) NULL,
    estado ENUM('Creada', 'Agendada', 'En proceso', 'Realizada', 'Informe', 'Finalizada') DEFAULT 'Creada',
    observaciones TEXT NULL,
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE,
    FOREIGN KEY (evaluador_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- 4. Evaluaciones (Citas y registros de psicólogos sin topes de horario)
CREATE TABLE IF NOT EXISTS evaluaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    solicitud_id INT UNIQUE NOT NULL,
    evaluador_id INT NOT NULL,
    fecha_evaluacion DATETIME NOT NULL,
    resultado_observaciones TEXT NULL,
    estado_evaluacion ENUM('Agendada', 'Realizada', 'Cancelada') DEFAULT 'Agendada',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (solicitud_id) REFERENCES solicitudes(id) ON DELETE CASCADE,
    FOREIGN KEY (evaluador_id) REFERENCES usuarios(id) ON DELETE CASCADE
);


//DATOS FALSOS

-- Insertar usuarios iniciales (Mocks)
INSERT INTO usuarios (nombre, email, password, rol) VALUES
('Sr. Rodrigo Fuentes', 'admin.talento@aquachile.com', '12345678', 'analista'),
('Dra. Valentina Lagos Schmidt', 'ps.evaluador@aquachile.com', '12345678', 'evaluador'),
('Dr. Carlos Soto Miranda', 'carlos.soto@aquachile.com', '12345678', 'evaluador');


-- Insertar candidatos de prueba iniciales
INSERT INTO candidatos (id, nombre, email, telefono) VALUES
(1, 'Juan Pérez Morales', 'jperez@correo.com', '+56912345678'),
(2, 'María Ignacia Rojas', 'mrojas@correo.com', '+56987654321');

-- Insertar solicitudes iniciales vinculadas
INSERT INTO solicitudes (id, candidato_id, evaluador_id, cargo, familia_cargo, archivo_url, carpeta_drive_url, estado) VALUES
(1, 1, 2, 'Analista de Selección y DO', 'administrativo', 'https://drive.google.com/file/d/ejemplo1/view', 'https://drive.google.com/drive/folders/ejemplo1', 'Creada'),
(2, 2, 2, 'Jefe de Turno Plantas', 'procesamiento', 'https://drive.google.com/file/d/ejemplo2/view', 'https://drive.google.com/drive/folders/ejemplo2', 'En proceso');