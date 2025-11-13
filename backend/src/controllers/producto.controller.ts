import { Request, Response } from 'express';
import { Producto } from '../models/producto.model';

// Listar los porductos
export const listarProductos = async (req: Request, res: Response) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al listar los productos' });
  }
};

// Obtener un producto por ID 
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

// Crear un nuevo producto
export const crearProducto = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    // Valida que los campos necesarios esten
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

// Actualiza un producto por ID 
export const actualizarProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ msg: `No se encontró el producto con el id ${id}` });
    }

    // Actualiza el producto con los nuevos dateos
    await producto.update(body);
    res.json(producto); // Devuelve el producto actualizado
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto por ID 
export const eliminarProducto = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ msg: `No se encontró el producto con el id ${id}` });
    }

    // Eliminar el producto
    await producto.destroy();
    res.json({ msg: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar el producto' });
  }
};