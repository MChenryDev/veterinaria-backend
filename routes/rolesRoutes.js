const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolesController');

// Obtener todas los roles
router.get('/', rolController.getAllRoles);

// Crear nuevo rol
router.post('/', rolController.createRol);

module.exports = router;