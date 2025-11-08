import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';
import { conectarDB } from './database/db';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔹 Conexión con la base de datos
conectarDB();

// 🔹 Rutas
app.use('/api/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});