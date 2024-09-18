const db = require('../config/db');

// Obtener todas las citas
exports.getAllCitas = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Cita');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las citas' });
  }
};

// Crear una nueva cita
exports.createCita = async (req, res) => {
  const { Motivo, ID_Mascota, ID_Veterinario } = req.body;
  try {
    await db.query('INSERT INTO Cita (Motivo, ID_Mascota, ID_Veterinario) VALUES (?, ?, ?)', 
    [Motivo, ID_Mascota, ID_Veterinario]);
    res.status(201).json({ message: 'Cita creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la cita' });
  }
};
