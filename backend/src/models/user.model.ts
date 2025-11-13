import { DataTypes, Model } from 'sequelize';
import { db } from '../database/db';

export class User extends Model {
  public id!: number;
  public nombre!: string;
  public apellido!: string;
  public direccion!: string;
  public email!: string;
  public password!: string;
  public rol!: 'admin' | 'cliente';
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol: {
      type: DataTypes.ENUM('admin', 'cliente'),
      allowNull: false,
      defaultValue: 'cliente' // 👈 importante
    }
  },
  {
    sequelize: db,
    modelName: 'User',
    tableName: 'usuarios',
    timestamps: false
  }
);
