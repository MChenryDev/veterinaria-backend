// controllers/facturaController.js

const db = require('../config/db');

// Obtener todas las facturas con sus detalles
exports.getAllFacturas = async (req, res) => {
    try {
        const sql = `
            SELECT f.ID_Factura, f.Fecha, f.Monto_Total, f.Estado, df.ID_Producto, df.Cantidad, df.Precio
            FROM Factura f
            LEFT JOIN Detalle_Factura df ON f.ID_Factura = df.ID_Factura
        `;

        const [results] = await db.query(sql);

        // Agrupamos los detalles por factura
        let facturasMap = {};
        results.forEach(row => {
            if (!facturasMap[row.ID_Factura]) {
                facturasMap[row.ID_Factura] = {
                    ID_Factura: row.ID_Factura,
                    Fecha: row.Fecha,
                    Monto_Total: row.Monto_Total,
                    Estado: row.Estado,
                    detalles: []
                };
            }
            facturasMap[row.ID_Factura].detalles.push({
                ID_Producto: row.ID_Producto,
                Cantidad: row.Cantidad,
                Precio: row.Precio
            });
        });

        // Convertimos el mapa a un array de facturas
        const facturas = Object.values(facturasMap);
        res.json(facturas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las facturas' });
    }
};
