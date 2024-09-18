// index.js
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require('./config/db');
const duenioRoutes = require('./routes/duenioRoutes');
const mascotaRoutes = require('./routes/mascotaRoutes');
const veterinarioRoutes = require('./routes/veterinarioRoutes');
const citaRoutes = require('./routes/citaRoutes');
const facturaRoutes = require('./routes/facturaRoutes');
const histClinicoRoutes = require('./routes/historialClinicoRoutes');
const inventarioRoutes = require('./routes/inventarioRoutes');
const detFacturaRoutes = require('./routes/detalleFacturaRoutes');

// Cargar variables de entorno desde un archivo .env
dotenv.config();

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de Veterinaria!');
});

// Puerto donde el servidor escuchará
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Rutas API
app.use('/api/duenios', duenioRoutes);
app.use('/api/mascotas', mascotaRoutes);
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/facturas', facturaRoutes);
app.use('/api/histClinicos', histClinicoRoutes);
app.use('/api/inventarios', inventarioRoutes);
app.use('/api/detFacturas', detFacturaRoutes);
  