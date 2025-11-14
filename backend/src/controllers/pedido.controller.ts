import { Request, Response } from 'express';
import { db } from '../database/db';
import { Pedido } from '../models/pedido.model';
import { PedidoItem } from '../models/pedido-item.model';
import { Producto } from '../models/producto.model';
import { AuthController } from './auth.controller';


export const crearPedido = async (req: Request, res: Response) => {
  const t = await db.transaction();
  
  // temporalmente id fijo, ajustar
  const usuario_id = 1
  
  const { items, metodo_pago, tipo_entrega, datos_entrega } = req.body;

  try {
    let total = 0;
    const itemsDB = [];

    for (const item of items) {
      const producto = await Producto.findByPk(item.producto_id);
      if (producto) {
        total += producto.precio * item.cantidad;
        itemsDB.push({
          producto_id: producto.id,
          cantidad: item.cantidad,
          precio_unitario: producto.precio
        });
      }
    }

    const pedido = await Pedido.create({
      usuario_id,
      metodo_pago,
      tipo_entrega,
      datos_entrega,
      total
    }, { transaction: t });

    await PedidoItem.bulkCreate(
      itemsDB.map(i => ({ ...i, pedido_id: pedido.id })),
      { transaction: t }
    );

    await t.commit();
    res.status(201).json({ message: 'Pedido guardado', id: pedido.id });

  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: 'Error al guardar pedido', error });
  }
};

export const obtenerPedidos = async (req: Request, res: Response) => {
  const usuario_id = 1; // ajustar con auth
  try {
    const pedidos = await Pedido.findAll({
      where: { usuario_id },
      include: [{ model: PedidoItem, include: [Producto] }],
      order: [['fecha', 'DESC']]
    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};