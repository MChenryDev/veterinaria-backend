const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // O donde tengas la configuración de tu base de datos.

const SECRET_KEY = '123456789'; // Cambia esto a un valor seguro.

// Registro de usuario
router.post('/register', async (req, res) => {
    const { Nombre_Usuario, Correo_Electronico, Contrasenia} = req.body;
    const ID_Rol = req.body.ID_Rol || 2;
    try {
        const hashedPassword = await bcrypt.hash(Contrasenia, 10);
        const query = 'INSERT INTO Usuarios (Nombre_Usuario, Correo_Electronico, Contrasenia, ID_Rol) VALUES (?, ?, ?, ?)';
        await db.query(query, [Nombre_Usuario, Correo_Electronico, hashedPassword, ID_Rol]);
        
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});

// Login de usuario
router.post('/login', async (req, res) => {
    const { Correo_Electronico, Contrasenia } = req.body;

    try {
        const query = 'SELECT * FROM Usuarios WHERE Correo_Electronico = ?';
        const [results] = await db.query(query, [Correo_Electronico]); // Verificar si la consulta devuelve resultados

        if (results.length === 0) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const user = results[0];
        console.log(user); // Depurar para ver si se está obteniendo el usuario correctamente

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(Contrasenia, user.Contrasenia);
        console.log(validPassword); // Depurar para ver si la comparación es correcta

        if (!validPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Si todo es correcto, generar el token
        const token = jwt.sign({ id: user.ID_Usuario, role: user.ID_Rol }, SECRET_KEY, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        console.error('Error en el login:', error); // Mostrar el error real
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Acceso denegado, no se proporcionó un token' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token no válido' });
    }
};

// Ruta protegida de ejemplo
router.get('/modulo-protegido', verifyToken, (req, res) => {
    res.json({ message: 'Acceso autorizado al módulo protegido' });
});

module.exports = router;
