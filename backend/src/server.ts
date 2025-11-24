import dotenv from 'dotenv';
import path from 'path';


const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/producto.routes'; 
import pedidoRoutes from './routes/pedido.routes';
import { db } from './database/db';



import './models/user.model';
import './models/producto.model';
import './models/pedido.model';
import './models/pedido-item.model';


const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/productos', productRoutes); 
app.use('/api/pedidos', pedidoRoutes);

const startServer = async () => {
  try {
    await db.authenticate();
    console.log('Database connected successfully.');

   
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