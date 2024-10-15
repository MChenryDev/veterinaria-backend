const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');  // Configuración de la base de datos
const { promisify } = require('util');
const query = promisify(db.query).bind(db);

const secretKey = '123456789';  // Debes cambiar esto por algo más seguro

// Registro de usuarios
exports.register = async (req, res) => {
    const { Nombre_Usuario, Contrasenia, Correo_Electronico, ID_Rol } = req.body;

    try {
        // Verificar si el correo electrónico ya está en uso
        const usuarioExistente = await query('SELECT * FROM Usuarios WHERE Correo_Electronico = ?', [Correo_Electronico]);
        if (usuarioExistente.length > 0) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(Contrasenia, 10);

        // Insertar el nuevo usuario en la base de datos
        const result = await query(
            'INSERT INTO Usuarios (Nombre_Usuario, Contrasenia, Correo_Electronico, ID_Rol) VALUES (?, ?, ?, ?)',
            [Nombre_Usuario, hashedPassword, Correo_Electronico, ID_Rol]
        );

        res.status(201).json({ message: 'Usuario registrado correctamente', userId: result.insertId });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
};

// Login de usuarios
exports.login = async (req, res) => {
    const { Correo_Electronico, Contrasenia } = req.body;

    try {
        // Verificar si el usuario existe
        const usuario = await query('SELECT * FROM Usuarios WHERE Correo_Electronico = ?', [Correo_Electronico]);
        if (usuario.length === 0) {
            return res.status(400).json({ message: 'Usuario no encontrado.' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(Contrasenia, usuario[0].Contrasenia);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta.' });
        }

        // Generar token JWT
        const token = jwt.sign({ userId: usuario[0].ID_Usuario, role: usuario[0].ID_Rol }, secretKey, {
            expiresIn: '1h',
        });

        res.json({ token, message: 'Inicio de sesión exitoso.' });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};
