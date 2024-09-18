const db = require('../config/db');

// Obtener todas las const db = require('../config/db');

// Obtener todas las facturas encabezado
exports.getAllFacturas = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Factura');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las Facturas Encabezado' });
  }
};

// Crear una nueva Factura Encabezado
exports.createFactura = async (req, res) => {
  const { Monto_Total, Estado, ID_Cita } = req.body;
  try {
    /* Considerar agregar el estado por defecto Mientras tanto en JSON se le agregó "A" de "Activo"*/
    await db.query('INSERT INTO Factura (Monto_Total, Estado, ID_Cita) VALUES (?, ?, ?)', 
    [Monto_Total, Estado, ID_Cita]);
    res.status(201).json({ message: 'Factura Encabezado creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la Factura Encabezado' });
  }
};
