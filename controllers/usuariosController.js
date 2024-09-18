const db = require('../config/db');

// Obtener todas las const db = require('../config/db');

// Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Usuarios');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  const { Nombre_Usuario, Contrasenia, Correo_Electronico, ID_Rol } = req.body;
  try {
    await db.query('INSERT INTO Usuarios (Nombre_Usuario, Contrasenia, Correo_Electronico, ID_Rol) VALUES (?, ?, ?, ?)', 
    [Nombre_Usuario, Contrasenia, Correo_Electronico, ID_Rol]);
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el Usuario' });
  }
};
