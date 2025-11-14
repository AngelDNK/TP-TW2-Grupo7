import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../database/db';
import { Pedido } from './pedido.model';
import { Producto } from './producto.model';

export interface PedidoItemAttributes {
  id: number;
  pedido_id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
}
interface PedidoItemCreationAttributes extends Optional<PedidoItemAttributes, 'id'> {}

export class PedidoItem extends Model<PedidoItemAttributes, PedidoItemCreationAttributes> implements PedidoItemAttributes {
  public id!: number;
  public pedido_id!: number;
  public producto_id!: number;
  public cantidad!: number;
  public precio_unitario!: number;
}

PedidoItem.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    pedido_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    producto_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    precio_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  { tableName: 'pedido_items', sequelize: db, timestamps: false }
);

Pedido.hasMany(PedidoItem, { foreignKey: 'pedido_id' });
PedidoItem.belongsTo(Pedido, { foreignKey: 'pedido_id' });
PedidoItem.belongsTo(Producto, { foreignKey: 'producto_id' });