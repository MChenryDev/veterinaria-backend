const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioController');

// Obtener todos los servicios
router.get('/', servicioController.getAllServicios);

// Crear nuevo servicio
router.post('/', servicioController.createServicio);

module.exports = router;