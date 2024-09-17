const db = require('../config/db');

// Obtener todas las mascotas
exports.getAllDuenios = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Duenio');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los dueños' });
  }
};

// Crear una nueva mascota
exports.createDuenio = async (req, res) => {
  const { Nombre, Direccion, Telefono, Correo_Electronico } = req.body;
  try {
    await db.query('INSERT INTO Duenio (Nombre, Direccion, Telefono, Correo_Electronico) VALUES (?, ?, ?, ?)', 
    [Nombre, Direccion, Telefono, Correo_Electronico]);
    res.status(201).json({ message: 'Dueño creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el dueño' });
  }
};
