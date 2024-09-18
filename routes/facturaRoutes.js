const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

// Obtener todas las factura encabezado
router.get('/', facturaController.getAllFacturas);

// Crear una nueva factura
router.post('/', facturaController.createFactura);

module.exports = router;