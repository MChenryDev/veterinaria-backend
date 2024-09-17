const db = require('../config/db');

// Obtener todas las mascotas
exports.getAllMascotas = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Mascota');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las mascotas' });
  }
};

// Crear una nueva mascota
exports.createMascota = async (req, res) => {
  const { Nombre, Especie, Raza, Edad, ID_Duenio } = req.body;
  try {
    await db.query('INSERT INTO Mascota (Nombre, Especie, Raza, Edad, ID_Duenio) VALUES (?, ?, ?, ?, ?)', 
    [Nombre, Especie, Raza, Edad, ID_Duenio]);
    res.status(201).json({ message: 'Mascota creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la mascota' });
  }
};
