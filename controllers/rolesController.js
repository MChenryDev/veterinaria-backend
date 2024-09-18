const db = require('../config/db');

// Obtener todas las const db = require('../config/db');

// Obtener todos los roles
exports.getAllRoles = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Roles');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los roles' });
  }
};

// Crear un nuevo Rol
exports.createRol = async (req, res) => {
  const { Nombre_Rol } = req.body;
  try {
    await db.query('INSERT INTO Roles (Nombre_Rol) VALUES (?)', 
    [Nombre_Rol]);
    res.status(201).json({ message: 'Rol creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el Rol' });
  }
};
