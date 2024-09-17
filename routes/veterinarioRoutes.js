const express = require('express');
const router = express.Router();
const veterinarioController = require('../controllers/veterinarioController');

// Obtener todos los veterinarios
router.get('/', veterinarioController.getAllVeterinarios);

// Crear un nuevo veterinario
router.post('/', veterinarioController.createVeterinario);

module.exports = router;
