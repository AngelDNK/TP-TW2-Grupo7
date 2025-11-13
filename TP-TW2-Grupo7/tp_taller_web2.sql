CREATE DATABASE tp_taller_web2;
USE tp_taller_web2;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol ENUM('admin', 'cliente') NOT NULL DEFAULT 'cliente'
);

INSERT INTO usuarios (nombre, apellido, direccion, email, password, rol)
VALUES
('Administrador', 'Principal', 'Oficina Central', 'admin@gmail.com', '$2b$10$zCw5yAS3ti/7hDk3xWQHIuxVnK8E/6eRzWUgIruN6xT7b5iUt4Sje', 'admin');

/* LA CONTRASEÑIA DEL ADMIN ES Password123 */


CREATE TABLE productos (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(128) NOT NULL,
  descripcion TEXT NOT NULL,
  clasificacion VARCHAR(128) NOT NULL,
  precio FLOAT(10,2) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO productos (nombre, descripcion, clasificacion, precio) VALUES
('Monitor Curvo Gamer 27"', 'Monitor 27" 144Hz, 1ms, Curvatura 1800R. Ideal para eSports.', 'Electrónica', 350000),
('Teclado Mecánico RGB Pro', 'Switches Gateron Brown, retroiluminación RGB configurable, 104 teclas.', 'Periféricos', 89500),
('Ratón Inalámbrico Ergonómico', 'Sensor óptico de alta precisión, diseño ergonómico, batería de larga duración.', 'Periféricos', 45000),
('Memoria RAM DDR4 16GB (2x8)', 'Kit de 16GB (2x8GB) DDR4 3200MHz, baja latencia.', 'Componentes PC', 76000),
('Tarjeta Gráfica RTX 4060 Ti', 'GPU de última generación para gaming 4K, 8GB GDDR6.', 'Componentes PC', 499000),
('Auriculares con Cancelación de Ruido', 'Sonido Hi-Fi, cancelación de ruido activa, conexión Bluetooth 5.0.', 'Audio', 121000),
('SSD NVMe 1TB Gen4', 'Unidad de estado sólido M.2 NVMe de 1TB, velocidades de lectura de hasta 7000MB/s.', 'Almacenamiento', 110000),
('Webcam Full HD 1080p con Micrófono', 'Cámara web 1080p a 30fps, ideal para streaming y videoconferencias.', 'Periféricos', 36000),
('Router Wi-Fi 6 AX3000', 'Router de doble banda compatible con Wi-Fi 6, velocidades combinadas de hasta 3000 Mbps.', 'Redes', 95000),
('Disco Duro Externo 4TB', 'Disco duro portátil de 4TB USB 3.0, ideal para backups.', 'Almacenamiento', 130000),
('Placa Base Z790 DDR5', 'Placa base de gama alta compatible con procesadores Intel de última generación.', 'Componentes PC', 280000),
('Refrigeración Líquida AIO 240mm', 'Sistema de refrigeración líquida All-In-One con radiador de 240mm, RGB.', 'Componentes PC', 86000),
('Altavoces Estéreo 2.0 de Escritorio', 'Altavoces compactos con sonido estéreo de alta calidad, conexión USB/Aux.', 'Audio', 50000),
('Cable HDMI 2.1 Ultra High Speed 2m', 'Soporta 4K@120Hz y 8K@60Hz, ancho de banda de 48Gbps.', 'Accesorios', 20000);
