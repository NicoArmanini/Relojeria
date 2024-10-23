-- Conectar a la base de datos
\c goodtime;

-- Crear la tabla 'tienda'
CREATE TABLE tienda (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    imagen VARCHAR(255)
);

-- Insertar productos
INSERT INTO tienda (nombre, precio, imagen)
VALUES 
    ('Citizen Sport Automatic', 487.50, 'citizen-sportAutomatic.png'),
    ('Omega Constellation', 9200.00, 'omegaConstellation.avif'),
    ('Casio MTP-VD03L-1A', 60.50, 'casio-VD03L-1A.avif'),
    ('Seiko SPB381', 1800.00, 'seiko-SPB381.png'),
    ('Valkur Balder', 92.90, 'valkur-Balder-removebg-preview.png'),
    ('Tommy Hilfiger Patrick', 190.00, 'tommy-Patrick-removebg-preview.png');

