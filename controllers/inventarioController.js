const db = require('../config/db');

// Obtener todas las const db = require('../config/db');

// Obtener todo el inventario
exports.getAllInventarios = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Inventario');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el Inventario' });
  }
};

// Crear un nuevo inventario
exports.createInventario = async (req, res) => {
  const { Nombre_Producto, Cantidad_Stock, Precio_Unitario } = req.body;
  try {
    await db.query('INSERT INTO Inventario (Nombre_Producto, Cantidad_Stock, Precio_Unitario) VALUES (?, ?, ?)', 
    [Nombre_Producto, Cantidad_Stock, Precio_Unitario]);
    res.status(201).json({ message: 'Inventario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el Inventario' });
  }
};
