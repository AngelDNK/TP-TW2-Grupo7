import dotenv from 'dotenv';
import path from 'path';

// 🔹 Cargar el archivo .env desde la raíz del backend
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

/*
PARA VER SI FUNCIONA EL RECUEPRAR CONTRASEÑA 
console.log("📩 Archivo .env cargado desde:", envPath);
console.log("📩 EMAIL_USER:", process.env.EMAIL_USER);
console.log("📩 EMAIL_PASS:", process.env.EMAIL_PASS ? "CARGADA ✅" : "NO CARGADA ❌");*/

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/producto.routes'; 
import { db } from './database/db';

// Importar modelos para la sincronización
import './models/user.model';
import './models/producto.model';

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/productos', productRoutes); 

const startServer = async () => {
  try {
    await db.authenticate();
    console.log('Database connected successfully.');

    // Sincronizar modelos
    // Usar alter:true en desarrollo para que actualice las tablas sin borrarlas
    await db.sync({ alter: true }); 
    console.log('All models were synchronized successfully.');

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database or start server:', error);
  }
};

startServer();

export default app;