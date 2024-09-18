const express = require('express');
const router = express.Router();
const histClinicoController = require('../controllers/historialClinicoController');

// Obtener todas las factura encabezado
router.get('/', histClinicoController.getAllHistClinicos);

// Crear una nueva factura
router.post('/', histClinicoController.createHistClinico);

module.exports = router;