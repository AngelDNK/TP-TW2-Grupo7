import { Request, Response } from 'express';
import { RequestConUsuario } from '../middleware/auth.middleware';
import { PedidoService } from '../service/pedido.service';

const pedidoService = new PedidoService();

export const crearPedido = async (req: Request, res: Response) => {
  const usuario_id = (req as RequestConUsuario).usuario_id;

  if (!usuario_id) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  try {
    const pedido = await pedidoService.crearPedido(usuario_id, req.body);
    res.status(201).json({ message: 'Pedido guardado', id: pedido.id });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar pedido', error });
  }
};

export const obtenerPedidos = async (req: Request, res: Response) => {
  const usuario_id = (req as RequestConUsuario).usuario_id;

  if (!usuario_id) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  try {
    const pedidos = await pedidoService.obtenerPedidos(usuario_id);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};