const db = require('../config/db');

// Obtener todas las const db = require('../config/db');

// Obtener todas las auditorias
exports.getAllAuditorias = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Auditoria');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las auditorias' });
  }
};

// Crear un nueva auditoria
exports.createAuditoria = async (req, res) => {
  const { Accion, ID_Usuario, Descripcion } = req.body;
  try {
    await db.query('INSERT INTO Auditoria (Accion, ID_Usuario, Descripcion) VALUES (?, ?, ?)', 
    [Accion, ID_Usuario, Descripcion]);
    res.status(201).json({ message: 'Auditoria creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la Auditoria' });
  }
};
