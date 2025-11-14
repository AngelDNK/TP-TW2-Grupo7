import { Request, Response } from 'express';
import { Producto } from '../models/producto.model';
import { Op } from 'sequelize';

export const listarProductos = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    
    let whereCondition = {};

    if (search) {
      whereCondition = {
        nombre: {
          [Op.like]: `%${search}%`
        }
      };
    }

    const productos = await Producto.findAll({ where: whereCondition });
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al listar los productos' });
  }
};

export const obtenerProductoPorId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findByPk(id);

    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ msg: `No se encontró el producto con el id ${id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener el producto' });
  }
};

export const crearProducto = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const { nombre, descripcion, clasificacion, precio } = body;
    if (!nombre || !descripcion || !clasificacion || precio == null) {
      return res.status(400).json({ msg: 'Faltan campos obligatorios' });
    }

    const producto = await Producto.create(body);
    res.status(201).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear el producto' });
  }
};

export const actualizarProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ msg: `No se encontró el producto con el id ${id}` });
    }

    await producto.update(body);
    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar el producto' });
  }
};

export const eliminarProducto = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ msg: `No se encontró el producto con el id ${id}` });
    }

    await producto.destroy();
    res.json({ msg: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar el producto' });
  }
};