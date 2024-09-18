const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

// Obtener todas las factura encabezado
router.get('/', facturaController.getAllFacturas);

// Crear una nueva factura
router.post('/', facturaController.createFactura);

// Actualizar una factura por ID
router.put('/:id', facturaController.updateFactura);

// Eliminar una factura por ID
router.delete('/:id', facturaController.deleteFactura);

// Obtener todas las facturas con detalles
router.get('/con-detalles', facturaController.getFacturasConDetalles);



module.exports = router;