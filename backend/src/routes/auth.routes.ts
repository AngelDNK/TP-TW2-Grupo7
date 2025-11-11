import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();

router.post('/signin', AuthController.signin);
router.post('/signup', AuthController.signup);
router.post('/recuperar', AuthController.recuperar);
router.post('/reset-password', AuthController.resetPassword);

export default router;