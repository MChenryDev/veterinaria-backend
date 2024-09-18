-- use VeterinariaDB;
create database VeterinariaDB;
-- Tabla Dueño con estado
CREATE TABLE Duenio (
    ID_Duenio INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Direccion VARCHAR(255),
    Telefono VARCHAR(15),
    Correo_Electronico VARCHAR(100),
    Estado CHAR(1) NOT NULL DEFAULT 'A' COMMENT 'A = Activo, I = Inactivo'
);

-- Tabla Mascota con referencia a Dueño
CREATE TABLE Mascota (
    ID_Mascota INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Especie VARCHAR(50),
    Raza VARCHAR(50),
    Edad INT,
    ID_Duenio INT,
    FOREIGN KEY (ID_Duenio) REFERENCES Duenio(ID_Duenio) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla Veterinario
CREATE TABLE Veterinario (
    ID_Veterinario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Especialidad VARCHAR(100),
    Contacto VARCHAR(15)
);

-- Tabla Cita con estado
CREATE TABLE Cita (
    ID_Cita INT AUTO_INCREMENT PRIMARY KEY,
    Fecha_Hora DATETIME NOT NULL,
    Motivo VARCHAR(255),
    Estado CHAR(1) NOT NULL DEFAULT 'P' COMMENT 'P = Pendiente, C = Completada, X = Cancelada',
    ID_Mascota INT,
    ID_Veterinario INT,
    FOREIGN KEY (ID_Mascota) REFERENCES Mascota(ID_Mascota) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ID_Veterinario) REFERENCES Veterinario(ID_Veterinario) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabla Factura
CREATE TABLE Factura (
    ID_Factura INT AUTO_INCREMENT PRIMARY KEY,
    Fecha DATETIME NOT NULL,
    Monto_Total DECIMAL(10, 2) NOT NULL,
    Estado VARCHAR(50), -- A = Activa, C = Cancelada
    ID_Cita INT,
    FOREIGN KEY (ID_Cita) REFERENCES Cita(ID_Cita) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla Historial Clínico
CREATE TABLE Historial_Clinico (
    ID_Historial INT AUTO_INCREMENT PRIMARY KEY,
    Diagnostico VARCHAR(255),
    Tratamiento VARCHAR(255),
    Notas VARCHAR(500),
    ID_Mascota INT,
    FOREIGN KEY (ID_Mascota) REFERENCES Mascota(ID_Mascota) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla Inventario
CREATE TABLE Inventario (
    ID_Producto INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Producto VARCHAR(100) NOT NULL,
    Cantidad_Stock INT NOT NULL,
    Precio_Unitario DECIMAL(10, 2) NOT NULL
);

-- Tabla Detalle Factura
CREATE TABLE Detalle_Factura (
    ID_Detalle INT AUTO_INCREMENT PRIMARY KEY,
    ID_Factura INT,
    ID_Producto INT,
    Cantidad INT NOT NULL,
    Precio DECIMAL(10, 2) NOT NULL,
    Tipo CHAR(1), -- P = Producto, S = Servicio
    FOREIGN KEY (ID_Factura) REFERENCES Factura(ID_Factura) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ID_Producto) REFERENCES Inventario(ID_Producto) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabla Usuarios
CREATE TABLE Usuarios (
    ID_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Usuario VARCHAR(100) NOT NULL,
    Contrasenia VARCHAR(255) NOT NULL,
    Correo_Electronico VARCHAR(100) NOT NULL,
    ID_Rol INT,
    FOREIGN KEY (ID_Rol) REFERENCES Roles(ID_Rol) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabla Roles
CREATE TABLE Roles (
    ID_Rol INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Rol VARCHAR(50) NOT NULL
);

-- Tabla Auditoría
CREATE TABLE Auditoria (
    ID_Auditoria INT AUTO_INCREMENT PRIMARY KEY,
    Accion VARCHAR(255) NOT NULL,
    Fecha DATETIME NOT NULL,
    ID_Usuario INT,
    Descripcion VARCHAR(500),
    FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Servicio (
    ID_Servicio INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(255),
    Precio DECIMAL(10, 2) NOT NULL
);

-- a detalle factura se le agrego TIPO CHAR(1) y ID_Servicio INT

SELECT 1 + 1 AS resultado
