import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../database/db';

export interface ProductoAttributes {
  id: number;
  nombre: string;
  descripcion: string;
  clasificacion: string;
  precio: number;
  imagen:string;
}

interface ProductoCreationAttributes extends Optional<ProductoAttributes, 'id'> {}

export class Producto extends Model<ProductoAttributes, ProductoCreationAttributes> implements ProductoAttributes {
  public id!: number;
  public nombre!: string;
  public descripcion!: string;
  public clasificacion!: string;
  public precio!: number;
  public imagen!: string;
}

Producto.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT, 
      allowNull: false,
    },
    clasificacion: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT(10, 2), 
      allowNull: false,
      validate: {
        isFloat: true, 
        min: 0, 
      },
    },
    imagen: {
  type: DataTypes.TEXT('long'), // para Base64 largos
  allowNull: false
},

  },
  {
    tableName: 'productos',
    sequelize: db,
    timestamps: false,
  }
);