import { Sequelize } from 'sequelize';

export const db = new Sequelize('tp_taller_web2', 'root', 'agusscuchi', {
  host: 'localhost',
  dialect: 'mysql',
});