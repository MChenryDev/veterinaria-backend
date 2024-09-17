const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');

// Obtener todas las mascotas
router.get('/', mascotaController.getAllMascotas);

// Crear una nueva mascota
router.post('/', mascotaController.createMascota);

module.exports = router;
