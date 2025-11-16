import { ProductoRepositorio } from '../repository/producto.repository';

export class ProductoService {

  async listar(search?: string) {
    return await ProductoRepositorio.listar(search);
  }

  async obtenerPorId(id: number) {
    const producto = await ProductoRepositorio.obtenerPorId(id);

    if (!producto) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    return producto;
  }

  async crear(data: any) {
    const { nombre, descripcion, precio, clasificacion } = data;

    if (!nombre || !descripcion || !clasificacion) {
      throw new Error("Los campos nombre, descripcion y clasificacion son obligatorios");
    }

    if (precio == null || precio < 0) {
      throw new Error("El precio no puede ser negativo o nulo");
    }

    return await ProductoRepositorio.crear(data);
  }

  async actualizar(id: number, data: any) {
    const existente = await ProductoRepositorio.obtenerPorId(id);
    if (!existente) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    return await ProductoRepositorio.actualizar(id, data);
  }

  async eliminar(id: number) {
    const existente = await ProductoRepositorio.obtenerPorId(id);
    if (!existente) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    return await ProductoRepositorio.eliminar(id);
  }
}