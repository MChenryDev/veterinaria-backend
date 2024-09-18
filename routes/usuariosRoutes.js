const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariosController');

// Obtener todas los roles
router.get('/', usuarioController.getAllUsuarios);

// Crear nuevo rol
router.post('/', usuarioController.createUsuario);

module.exports = router;