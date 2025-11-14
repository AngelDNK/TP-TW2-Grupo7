import { Router } from 'express';
import { crearPedido, obtenerPedidos } from '../controllers/pedido.controller';
import { verificarToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/', verificarToken, crearPedido);
router.get('/', verificarToken, obtenerPedidos);

export default router;