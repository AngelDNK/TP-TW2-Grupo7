import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes); // 👈 esto es lo importante

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});