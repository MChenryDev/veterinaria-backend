const express = require('express');
const router = express.Router();
const detFacturaController = require('../controllers/detalleFacturaController');

// Obtener todas las factura encabezado
router.get('/', detFacturaController.getAllDetFacturas);

// Crear una nueva factura
router.post('/', detFacturaController.createDetFactura);

module.exports = router;