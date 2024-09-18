const express = require('express');
const router = express.Router();
const auditoriaController = require('../controllers/auditoriaController');

// Obtener todas las auditorias
router.get('/', auditoriaController.getAllAuditorias);

// Crear nueva auditoria
router.post('/', auditoriaController.createAuditoria);

module.exports = router;