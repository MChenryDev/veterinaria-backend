const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

// Obtener todas las facturas con detalles
router.get('/', facturaController.getAllFacturas);

module.exports = router;
