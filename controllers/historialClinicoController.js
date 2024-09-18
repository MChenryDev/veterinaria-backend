const db = require('../config/db');

// Obtener todas las const db = require('../config/db');

// Obtener todas los historiales clinicos
exports.getAllHistClinicos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Historial_Clinico');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los historiales clinicos' });
  }
};

// Crear un nuevo historial clinico
exports.createHistClinico = async (req, res) => {
  const { Diagnostico, Tratamiento, Notas, ID_Mascota } = req.body;
  try {
    await db.query('INSERT INTO Historial_Clinico (Diagnostico, Tratamiento, Notas, ID_Mascota) VALUES (?, ?, ?, ?)', 
    [Diagnostico, Tratamiento, Notas, ID_Mascota]);
    res.status(201).json({ message: 'Historial clinico creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el Historial Clinico' });
  }
};
