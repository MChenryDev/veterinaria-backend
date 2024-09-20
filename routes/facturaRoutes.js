const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

// Obtener todas las factura encabezado
router.get('/', facturaController.getAllFacturas);

// Obtener todas las facturas con detalles
router.get('/con-detalles', facturaController.getFacturasConDetalles);
// Obtener una factura por ID con detalles
router.get('/:id', facturaController.getFacturaByIdConDetalles);

// Crear, Actualizar, Eliminar una factura
router.post('/', facturaController.createFactura);
router.put('/:id', facturaController.updateFactura);
router.delete('/:id', facturaController.deleteFactura);

module.exports = router;