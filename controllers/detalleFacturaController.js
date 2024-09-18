const db = require('../config/db');

// Obtener todas las const db = require('../config/db');

// Obtener todas los detalles de factura
exports.getAllDetFacturas = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Detalle_Factura');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los detalles de factura' });
  }
};

// Crear un nuevo detalles de factura
exports.createDetFactura = async (req, res) => {
  const { ID_Factura, ID_Producto, Cantidad, Precio } = req.body;
  try {
    await db.query('INSERT INTO Detalle_Factura (ID_Factura, ID_Producto, Cantidad, Precio) VALUES (?, ?, ?, ?)', 
    [ID_Factura, ID_Producto, Cantidad, Precio]);
    res.status(201).json({ message: 'Detalle Factura creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el Detalle Factura' });
  }
};
