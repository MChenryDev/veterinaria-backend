const db = require('../config/db');

// Obtener todas las const db = require('../config/db');

// Obtener todas las facturas encabezado
exports.getAllFacturas = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Factura');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las Facturas Encabezado' });
  }
};

// Obtener todas las facturas con detalles
exports.getFacturasConDetalles = async (req, res) => {
  const sql = `
      SELECT f.ID_Factura, f.Fecha, f.Monto_Total, f.Estado, df.ID_Producto, df.Cantidad, df.Precio
      FROM Factura f
      LEFT JOIN Detalle_Factura df ON f.ID_Factura = df.ID_Factura
  `;

  try {
      const [results] = await db.query(sql);

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

      const facturas = Object.values(facturasMap);
      res.json(facturas);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener las facturas con detalles' });
  }
};

// Obtener una factura con detalles por ID
exports.getFacturaByIdConDetalles = async (req, res) => {
  const { id } = req.params;
  const sql = `
      SELECT f.ID_Factura, f.Fecha, f.Monto_Total, f.Estado, df.ID_Producto, df.ID_Servicio, df.Cantidad, df.Precio, df.Tipo
      FROM Factura f
      LEFT JOIN Detalle_Factura df ON f.ID_Factura = df.ID_Factura
      WHERE f.ID_Factura = ?
  `;
  try {
      const [results] = await db.query(sql, [id]);

      if (results.length === 0) {
          return res.status(404).json({ error: 'Factura no encontrada' });
      }

      const factura = {
          ID_Factura: results[0].ID_Factura,
          Fecha: results[0].Fecha,
          Monto_Total: results[0].Monto_Total,
          Estado: results[0].Estado,
          detalles: results.map(row => ({
              ID_Producto: row.ID_Producto,
              ID_Servicio: row.ID_Servicio,
              Cantidad: row.Cantidad,
              Precio: row.Precio,
              Tipo: row.Tipo
          }))
      };

      res.json(factura);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener la factura con detalles' });
  }
};


// Crear una nueva Factura junto con sus Detalles
exports.createFactura = async (req, res) => {
  const { Monto_Total, Estado, ID_Cita, Detalles } = req.body;

  try {
    // Iniciar una transacción
    await db.query('START TRANSACTION');

    // Insertar la factura (encabezado)
    const [result] = await db.query(
      'INSERT INTO Factura (Monto_Total, Estado, ID_Cita) VALUES (?, ?, ?)', 
      [Monto_Total, Estado, ID_Cita]
    );

    const facturaId = result.insertId; // Obtener el ID de la factura recién creada

    // Insertar los detalles de la factura
    for (const detalle of Detalles) {
      const { ID_Producto, Cantidad, Precio, Tipo, ID_Servicio } = detalle;

      await db.query(
        'INSERT INTO Detalle_Factura (ID_Factura, ID_Producto, Cantidad, Precio, Tipo, ID_Servicio) VALUES (?, ?, ?, ?, ?, ?)', 
        [facturaId, ID_Producto, Cantidad, Precio, Tipo, ID_Servicio]
      );
    }

    // Confirmar la transacción
    await db.query('COMMIT');
    res.status(201).json({ message: 'Factura y detalles creados exitosamente' });
    
  } catch (error) {
    // En caso de error, revertir la transacción
    await db.query('ROLLBACK');
    res.status(500).json({ error: 'Error al crear la factura y sus detalles' });
  }
};

// Actualizar una Factura junto con sus Detalles
exports.updateFactura = async (req, res) => {
  const { id } = req.params;
  const { Monto_Total, Estado, ID_Cita, detalles } = req.body;

  try {
    // Iniciar una transacción
    await db.query('START TRANSACTION');

    // Actualizar la factura (encabezado)
    await db.query(
      'UPDATE Factura SET Monto_Total = ?, Estado = ?, ID_Cita = ? WHERE ID_Factura = ?',
      [Monto_Total, Estado, ID_Cita, id]
    );

    // Obtener los detalles actuales en la base de datos
    const [detallesExistentes] = await db.query(
      'SELECT ID_Detalle, ID_Producto, ID_Servicio, Cantidad, Precio FROM Detalle_Factura WHERE ID_Factura = ?',
      [id]
    );

    // Verificar los detalles existentes y actualizarlos o eliminarlos si ya no están
    for (const detalleExistente of detallesExistentes) {
      const { ID_Detalle, ID_Producto, ID_Servicio } = detalleExistente;

      // Buscar si el detalle existe en los detalles nuevos
      const detalleNuevo = detalles.find(detalle =>
        (detalle.ID_Producto === ID_Producto || detalle.ID_Servicio === ID_Servicio)
      );

      if (detalleNuevo) {
        // Actualizar el detalle si ha cambiado
        const { Cantidad, Precio } = detalleNuevo;
        await db.query(
          'UPDATE Detalle_Factura SET Cantidad = ?, Precio = ? WHERE ID_Detalle = ?',
          [Cantidad, Precio, ID_Detalle]
        );
      } else {
        // Eliminar el detalle si no está en los nuevos
        await db.query('DELETE FROM Detalle_Factura WHERE ID_Detalle = ?', [ID_Detalle]);
      }
    }

    // Insertar los nuevos detalles que no existían antes
    for (const detalle of detalles) {
      const { ID_Producto, Cantidad, Precio, Tipo, ID_Servicio } = detalle;

      // Si el detalle es nuevo (no tiene ID en la base de datos)
      const detalleExistente = detallesExistentes.find(d =>
        (d.ID_Producto === ID_Producto || d.ID_Servicio === ID_Servicio)
      );

      if (!detalleExistente) {
        await db.query(
          'INSERT INTO Detalle_Factura (ID_Factura, ID_Producto, Cantidad, Precio, Tipo, ID_Servicio) VALUES (?, ?, ?, ?, ?, ?)', 
          [id, ID_Producto || null, Cantidad, Precio, Tipo, ID_Servicio || null]
        );
      }
    }

    // Confirmar la transacción
    await db.query('COMMIT');
    res.status(200).json({ message: 'Factura y detalles actualizados exitosamente' });

  } catch (error) {
    // En caso de error, revertir la transacción
    await db.query('ROLLBACK');
    res.status(500).json({ error: 'Error al actualizar la factura y sus detalles' });
  }
};


// Eliminar una Factura y sus Detalles
exports.deleteFactura = async (req, res) => {
  const { id } = req.params;

  try {
    // Iniciar una transacción
    await db.query('START TRANSACTION');

    // Eliminar los detalles de la factura
    await db.query('DELETE FROM Detalle_Factura WHERE ID_Factura = ?', [id]);

    // Eliminar la factura (encabezado)
    await db.query('DELETE FROM Factura WHERE ID_Factura = ?', [id]);

    // Confirmar la transacción
    await db.query('COMMIT');
    res.status(200).json({ message: 'Factura y detalles eliminados exitosamente' });

  } catch (error) {
    // En caso de error, revertir la transacción
    await db.query('ROLLBACK');
    res.status(500).json({ error: 'Error al eliminar la factura y sus detalles' });
  }
};


