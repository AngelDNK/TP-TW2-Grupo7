import { Pedido } from '../models/pedido.model';
import { PedidoItem } from '../models/pedido-item.model';
import { Producto } from '../models/producto.model';

export class PedidoRepository {
  async crearPedido(data: any, transaction: any) {
    return Pedido.create(data, { transaction });
  }

  async crearItems(items: any[], transaction: any) {
    return PedidoItem.bulkCreate(items, { transaction });
  }

  async buscarProductoPorId(id: number) {
    return Producto.findByPk(id);
  }

  async obtenerPedidosPorUsuario(usuario_id: number) {
    return Pedido.findAll({
      where: { usuario_id },
      include: [{ model: PedidoItem, include: [Producto] }],
      order: [['fecha', 'DESC']]
    });
  }
}