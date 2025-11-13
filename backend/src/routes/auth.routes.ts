import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();

// 🔹 Rutas de autenticación
router.post('/signin', AuthController.signin);
router.post('/signup', AuthController.signup);

// 🔹 Recuperar contraseña (envía correo con link)
router.post('/recuperar', AuthController.recuperar);

// 🔹 Restablecer contraseña (cuando el usuario hace clic en el link del correo)
router.post('/reset-password', AuthController.resetPassword);

export default router;