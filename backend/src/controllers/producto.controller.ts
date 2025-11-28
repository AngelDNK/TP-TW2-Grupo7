import { Request, Response } from 'express';
import { ProductoService } from '../service/producto.service';

const productoService = new ProductoService();

export const listarProductos = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const productos = await productoService.listar(search as string);
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al listar los productos' });
  }
};

export const obtenerProductoPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const producto = await productoService.obtenerPorId(Number(id));
    res.json(producto);
  } catch (error: any) {
    console.error(error);
    if (error.message.includes('no encontrado')) {
        return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Error al obtener el producto' });
  }
};

export const crearProducto = async (req: Request, res: Response) => {
  try {
    const producto = await productoService.crear(req.body);
    res.status(201).json(producto);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ msg: error.message || 'Error al crear el producto' });
  }
};

export const actualizarProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productoActualizado = await productoService.actualizar(Number(id), req.body);
    res.json(productoActualizado);
  } catch (error: any) {
    console.error(error);
    if (error.message.includes('no encontrado')) {
        return res.status(404).json({ msg: error.message });
    }
    res.status(400).json({ msg: error.message || 'Error al actualizar el producto' });
  }
};

export const eliminarProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await productoService.eliminar(Number(id));
    res.json({ msg: 'Producto eliminado exitosamente' });
  } catch (error: any) {
    console.error(error);
    if (error.message.includes('no encontrado')) {
        return res.status(404).json({ msg: error.message });
    }
    res.status(500).json({ msg: 'Error al eliminar el producto' });
  }
};