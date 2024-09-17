const express = require('express');
const router = express.Router();
const duenioController = require('../controllers/duenioController');

// Obtener todas los duenños
router.get('/', duenioController.getAllDuenios);

// Crear una nueva mascota
router.post('/', duenioController.createDuenio);

module.exports = router;
