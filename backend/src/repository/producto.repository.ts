import { Op } from 'sequelize';
import { Producto } from '../models/producto.model';

export class ProductoRepositorio {
  
  static async listar(search?: string) {
    const where: any = {};

    if (search) {
      where.nombre = {
        [Op.like]: `%${search}%`
      };
    }

    return await Producto.findAll({ where });
  }

  static async obtenerPorId(id: number) {
    return await Producto.findByPk(id);
  }

  static async crear(data: any) {
    return await Producto.create(data);
  }

  static async actualizar(id: number, data: any) {
    const producto = await Producto.findByPk(id);
    if (!producto) return null;

    await producto.update(data);
    return producto;
  }

  static async eliminar(id: number) {
    const producto = await Producto.findByPk(id);
    if (!producto) return null;

    await producto.destroy();
    return true;
  }
}