import { Router } from 'express';
import {
  listarProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '../controllers/producto.controller';
import { verificarToken, esAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', listarProductos);
router.get('/:id', obtenerProductoPorId);
router.post('/', verificarToken, esAdmin, crearProducto); 
router.put('/:id', verificarToken, esAdmin, actualizarProducto);
router.delete('/:id', verificarToken, esAdmin, eliminarProducto);

export default router;