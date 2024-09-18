const db = require('../config/db');

// Obtener todas las const db = require('../config/db');

// Obtener todos los servicios
exports.getAllServicios = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Servicio');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los servicios' });
  }
};

// Crear un nuevo servicio
exports.createServicio = async (req, res) => {
  const { Nombre, Descripcion, Precio } = req.body;
  try {
    await db.query('INSERT INTO Servicio (Nombre, Descripcion, Precio) VALUES (?, ?, ?)', 
    [Nombre, Descripcion, Precio]);
    res.status(201).json({ message: 'Servicio creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el Servicio' });
  }
};
