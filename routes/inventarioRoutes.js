const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');

// Obtener todas las factura encabezado
router.get('/', inventarioController.getAllInventarios);

// Crear una nueva factura
router.post('/', inventarioController.createInventario);

module.exports = router;