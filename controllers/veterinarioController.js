const db = require('../config/db');

// Obtener todos los veterinarios
exports.getAllVeterinarios = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Veterinario');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los veterinarios' });
  }
};

// Crear un nuevo veterinario
exports.createVeterinario = async (req, res) => {
  const { Nombre, Especialidad, Contacto } = req.body;
  try {
    await db.query('INSERT INTO Veterinario (Nombre, Especialidad, Contacto) VALUES (?, ?, ?)', 
    [Nombre, Especialidad, Contacto]);
    res.status(201).json({ message: 'Veterinario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el veterinario' });
  }
};
