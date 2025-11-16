import { Request, Response } from 'express';
import { ProductoRepositorio } from '../repository/producto.repository';

// -----------------------------------------------------

export const listarProductos = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const productos = await ProductoRepositorio.listar(search as string);
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al listar los productos' });
  }
};

export const obtenerProductoPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const producto = await ProductoRepositorio.obtenerPorId(Number(id));

    if (!producto) {
      return res.status(404).json({ msg: `No se encontró el producto con el id ${id}` });
    }

    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener el producto' });
  }
};

export const crearProducto = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, clasificacion, precio } = req.body;

    if (!nombre || !descripcion || !clasificacion || precio == null) {
      return res.status(400).json({ msg: 'Faltan campos obligatorios' });
    }

    const producto = await ProductoRepositorio.crear(req.body);
    res.status(201).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear el producto' });
  }
};

export const actualizarProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const productoActualizado = await ProductoRepositorio.actualizar(Number(id), req.body);

    if (!productoActualizado) {
      return res.status(404).json({ msg: `No se encontró el producto con el id ${id}` });
    }

    res.json(productoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar el producto' });
  }
};

export const eliminarProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eliminado = await ProductoRepositorio.eliminar(Number(id));

    if (!eliminado) {
      return res.status(404).json({ msg: `No se encontró el producto con el id ${id}` });
    }

    res.json({ msg: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar el producto' });
  }
};