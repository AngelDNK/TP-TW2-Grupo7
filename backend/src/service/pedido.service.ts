import { db } from '../database/db';
import { PedidoRepository } from '../repository/pedido.repository';

export class PedidoService {
  private pedidoRepo = new PedidoRepository();

  async crearPedido(usuario_id: number, body: any) {
    const t = await db.transaction();

    try {
      const { items, metodo_pago, tipo_entrega, datos_entrega } = body;

      let total = 0;
      const itemsDB = [];

      for (const item of items) {
        const producto = await this.pedidoRepo.buscarProductoPorId(item.producto_id);

        if (!producto) continue;

        total += producto.precio * item.cantidad;
        itemsDB.push({
          producto_id: producto.id,
          cantidad: item.cantidad,
          precio_unitario: producto.precio
        });
      }

      const pedido = await this.pedidoRepo.crearPedido({
        usuario_id,
        metodo_pago,
        tipo_entrega,
        datos_entrega,
        total
      }, t);

      await this.pedidoRepo.crearItems(
        itemsDB.map(i => ({ ...i, pedido_id: pedido.id })),
        t
      );

      await t.commit();
      return pedido;

    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async obtenerPedidos(usuario_id: number) {
    return this.pedidoRepo.obtenerPedidosPorUsuario(usuario_id);
  }
}