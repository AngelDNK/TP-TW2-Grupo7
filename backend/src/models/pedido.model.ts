import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../database/db';
import { User } from './user.model';

export interface PedidoAttributes {
  id: number;
  usuario_id: number;
  fecha: Date;
  metodo_pago: 'efectivo' | 'tarjeta';
  tipo_entrega: 'retiro' | 'envio';
  datos_entrega: any;
  total: number;
}

interface PedidoCreationAttributes extends Optional<PedidoAttributes, 'id' | 'fecha'> {}

export class Pedido extends Model<PedidoAttributes, PedidoCreationAttributes> implements PedidoAttributes {
  public id!: number;
  public usuario_id!: number;
  public fecha!: Date;
  public metodo_pago!: 'efectivo' | 'tarjeta';
  public tipo_entrega!: 'retiro' | 'envio';
  public datos_entrega!: any;
  public total!: number;
}

Pedido.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    usuario_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    metodo_pago: { type: DataTypes.ENUM('efectivo', 'tarjeta'), allowNull: false },
    tipo_entrega: { type: DataTypes.ENUM('retiro', 'envio'), allowNull: false },
    datos_entrega: { type: DataTypes.JSON, allowNull: true },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  { tableName: 'pedidos', sequelize: db, timestamps: false }
);

Pedido.belongsTo(User, { foreignKey: 'usuario_id' });
User.hasMany(Pedido, { foreignKey: 'usuario_id' });