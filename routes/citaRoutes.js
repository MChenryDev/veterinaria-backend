const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

// Obtener todas las citas
router.get('/', citaController.getAllCitas);

// Crear una nueva cita
router.post('/', citaController.createCita);

module.exports = router;
